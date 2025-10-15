const http = require("http");

// scegliendo 127.0.0.1 il server accetterà richieste solo da client locali perché sono gli unici a poter accedere
//  a questo indirizzo attraverso l'interfaccia di loopback
const host = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    // possiamo scegliere in modo esplicito lo status code da restituire tramite res.statusCode
    // tale status code verrà trasmesso solo quando il server invierà la risposta al client
    res.statusCode = 200;
    res.end("Benvenuto nella biblioteca HTTP");
});

// port e host sono due costanti che contengono la porta e l'host su cui il server viene esposto
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
