const http = require("http");

const host = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    // restituiamo al client un messaggio in formato json
    // possiamo convertire un oggetto javascript in json tramite JSON.stringify
    res.end('{"message": "Benvenuto nella biblioteca HTTP"}');
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
