import { useState, useRef } from "react";
import { marked } from "marked";
import html2pdf from "html2pdf.js";

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
    <div style={{ display: 'flex', gap: '1rem', padding: '1rem', height: '100vh' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid #ccc' }}>
        <textarea
          style={{ flex: 1, padding: '1rem', fontSize: '1rem', border: 'none', resize: 'none' }}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid #ccc' }}>
        <div
          ref={renderedRef}
          style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}
          dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', padding: '1rem' }}>
          <button onClick={handleCopy} style={{ padding: '0.5rem 1rem' }}>Copy</button>
          <button onClick={handleExport} style={{ padding: '0.5rem 1rem' }}>Export</button>
        </div>
      </div>
    </div>
  );
};

export default App;