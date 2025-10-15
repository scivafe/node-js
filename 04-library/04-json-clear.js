const http = require("http");

const host = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    // Gli header sono campi inviati prima del contenuto sia nelle richieste che nelle risposte http. Essi vengono inviati
    // in formato testuale con struttura <nome-header>: <valore>. Il loro nome è case-insensitive e ogni richiesta può contenere
    // un numero variabile. Il loro scopo è quello di aggiungere maggiori informazioni riguardo a quello che si sta comunicando
    // dall'altra parte
    // Content-Type viene usato per indicare il tipo di contenuto che sta inviando, come application/json
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Benvenuto nella biblioteca HTTP" }));
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
