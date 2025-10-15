const http = require("http");

const host = "127.0.0.1";
const port = 3000;

// la proprietà keepAliveTimeout permette di configurare per quanto tempo (millisecondi) la connessione stabilita da una
// richiesta tra client e server potrà essere mantenuta aperta
// se dopo aver ricevuto la prima risposta il client invierà un messaggio entro 50 secondi, questo potrà riutilizzare
// la connessione TCP esistente senza crearne una nuova
const server = http.createServer({ keepAliveTimeout: 50000 }, (req, res) => {
    res.end("Keeping the connection alive!");
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
