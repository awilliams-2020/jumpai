import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { marked } from "marked";
import html2pdf from "html2pdf.js";
import './App.css';

const App = () => {
    const [markdown, setMarkdown] = useState("# Hello World\nThis is a live markdown preview.");
  const renderedRef = useRef(null);

  const handleCopy = async () => {
    if (renderedRef.current) {
      const html = renderedRef.current.innerHTML;
      const blob = new Blob([html], { type: 'text/html' });
      const data = [new ClipboardItem({ 'text/html': blob })];
      await navigator.clipboard.write(data);
    }
  };

  const handleExport = () => {
    if (renderedRef.current) {
      html2pdf().from(renderedRef.current).save("markdown-preview.pdf");
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-screen">
      <Card className="h-full flex flex-col">
        <CardContent className="p-4 flex-1 overflow-auto">
          <Textarea
            className="w-full h-full"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </CardContent>
      </Card>
      <Card className="h-full flex flex-col">
        <CardContent className="p-4 flex-1 overflow-auto">
          <div
            ref={renderedRef}
            className="prose prose-lg"
            dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
          />
        </CardContent>
        <div className="flex justify-end gap-2 p-4">
          <Button onClick={handleCopy}>Copy</Button>
          <Button onClick={handleExport}>Export</Button>
        </div>
      </Card>
    </div>
  );
};

export default App;