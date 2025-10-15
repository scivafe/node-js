const http = require("http");

const host = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    // verifichiamo se il tipo contenuto nell'header Accept è uno dei due che il nostro server supporta
    const acceptJson = req.headers.accept === "application/json";
    const acceptText = req.headers.accept === "text/plain";

    if (acceptJson) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Benvenuto nella biblioteca HTTP" }));
    } else if (acceptText) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Benvenuto nella biblioteca HTTP");
    } else {
        // il server non è in grado di rispondere con una rappresentazione del tipo richiesto
        res.statusCode = 406;
        res.end();
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
