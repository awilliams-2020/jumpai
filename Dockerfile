From golang:1.24.3-alpine3.21

WORKDIR /go/src/app

COPY . .

RUN go build -o main main.go
EXPOSE 80
CMD ["./main"]