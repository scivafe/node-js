const http = require("http");
const { getAcceptedTypes, resJson, resText } = require("./utils");

const host = "127.0.0.1";
const port = 3000;

const library = {
    message: "Benvenuto nella biblioteca HTTP",
    // aggiungiamo un elenco (di libri con titolo e autore) che useremo come risorsa da restituire in un nuovo path
    books: [
        { author: "Naomi Klein", title: "Shock economy" },
        { author: "Serge Latouche", title: "L'invenzione dell'economia" },
        {
            author: "Yanis Varoufakis",
            title: "È l'economia che cambia il mondo",
        },
    ],
};

// le proprietà in routes corrispondono ai path delle risorse che vogliamo siano esposti dal server
// ogni proprietà contiene le funzioni che restituiscono il contenuto nei due formati supportati dal server
const routes = {
    "/": {
        // le stringhe restituite tramite getText() e getJson() cambiano a seconda dell'url in cui ci si trova
        // all'indirizzo / (root) mostriamo la stringa contenuta in message
        getText: () => library.message,
        getJson: function () {
            return JSON.stringify({ message: library.message });
        },
    },
    "/books": {
        // all'indirizzo /books mostriamo l'elenco di libri
        getText: () =>
            // l'array di oggetti presente in library viene trasformato (usando Array.reduce) in una stringa dove ogni libro è separato
            // da un a capo
            library.books.reduce((acc, cur) => {
                acc += `${cur.author} - ${cur.title}\n`;
                return acc;
            }, ""),
        getJson: function () {
            return JSON.stringify(library.books);
        },
    },
};

const server = http.createServer((req, res) => {
    // il codice di gestione della richiesta inizia con il controllo dell'url ricevuto dal client, che node mette a disposizione
    // all'interno della proprietà req.url. Tale campo contiene la stringa che rappresenta l'inirizzo (path relativo) richiesto
    // usiamo quindi l'url per accedere alla proprietà corrispondente nell'oggetto routes
    const route = routes[req.url];
    // se la proprietà corrispondente l'url non viene trovata questa sarà undefined
    if (!route) {
        res.statusCode = 404; // risorsa non trovata
        res.end();
        return; // il flusso di esecuzione della richiesta viene interrotto
    }

    const accepts = getAcceptedTypes(req);
    if (accepts.json) {
        resJson(res, route.getJson());
    } else if (accepts.textPlain || accepts.text || accepts.any) {
        resText(res, route.getText());
    } else {
        res.statusCode = 406;
        res.end();
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
