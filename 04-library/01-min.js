// modulo che fornisce le funzionalità principali del protocollo HTTP
const http = require("http");

// http.Server rappresenta un server HTTP in grado di ricevere richieste e inviare risposte.
// la gestione del flusso di richiesta/risposta è delegata alla funzione passata come parametro in http.createServer().
// tale funzione viene invocata ogni volta che il server riceve una richesta e le vengono passati gli oggetti
//  req (che rappresenta la richiesta in entrata ed è istanza di http.IncomingMessage)
//  e res (che rappresenta la risposta che sarà inviata dal server al client ed è istanza di http.ServerResponse)
const server = http.createServer((req, res) => {
    // con res.end() inviamo come risposta del testo. res.end() senza parametro restituisce una risposta vuota
    // se res.end() non viene invocats la richiesta rimarrà in sospeso
    res.end("Benvenuto nella biblioteca HTTP");
});

// la funzione listen espone il server su una porta, in questo caso 3000
server.listen(3000, () => {
    console.log("Server running");
});
