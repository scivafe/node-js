const http = require("http");
// i moduli locali devono essere importati indicandone il path (omettendo però l'estensione del file)
const { getAcceptedTypes, resText, resJson } = require("./utils");

const host = "127.0.0.1";
const port = 3000;

// data contiene il contenuto delle risposte (res)
const data = {
    json: JSON.stringify({ message: "Benvenuto nella biblioteca HTTP" }),
    text: "Benvenuto nella biblioteca HTTP",
};
const server = http.createServer((req, res) => {
    // usiamo la funzione getAcceptedTypes() (dal modulo utils) per ottenere le informazioni sui tipi supportati e per inviare
    // la risposta al client tramite resJson o resText
    const accepts = getAcceptedTypes(req);
    if (accepts.json) {
        resJson(res, data.json);
    } else if (accepts.textPlain || accepts.text || accepts.any) {
        resText(res, data.text);
    } else {
        res.statusCode = 406;
        res.end();
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
