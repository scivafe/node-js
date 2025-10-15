const http = require("http");

const host = "127.0.0.1";
const port = 3000;

const server = http.createServer({ keepAliveTimeout: 50000 });
// un'altro meccanismo che permette di visualizzare in modo esplicito la creazione della connessione e l'invio della richiesta
// è quello degli eventi
// usando la funzione on("evento", listener) possiamo far eseguire del codice ogni volta che un certo evento si verifica
// visto che questa funzione resta in ascolto di quell'evento prende il nome di listener
server.on("connection", () => console.log("connection")); // connessione con il client (l'evento viene emesso ogni volta che il client si collega al server)
server.on("request", (req, res) => {
    // ricezione della richiesta all'interno della connessione (l'evento request viene emesso ogni volta che il server riceve una richiesta)
    console.log("request");
    res.end("Hello from the server");
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});

// una callback viene eseguita una sola volta poiche è legata all'evento di esecuzione completata della funzione a cui viene passata
// un listener viene eseguito ogni volta che un certo evento si verifica. Inoltre può essere aggiunto o rimosso in qualsiasi momento
