const http = require("http");
const { getAcceptedTypes, resJson, resText } = require("./utils");

const host = "127.0.0.1";
const port = 3000;

const library = {
    message: "Benvenuto nella biblioteca HTTP",
    books: [
        { author: "Felix Martin", title: "Denaro" },
        {
            author: "Yanis Varoufakis",
            title: "È l'economia che cambia il mondo",
        },
        { author: "Yanis Varoufakis", title: "Adulti nella stanza" },
        { author: "Naomi Klein", title: "Shock economy" },
        { author: "Serge Latouche", title: "L'invenzione dell'economia" },
        { author: "Thomas Piketty", title: "Il capitale nel XXI secolo" },
    ],
};

// operazione di filtraggio dei libri
function findBooks(q) {
    // se riceve in input il parametro q filtra l'array books scegliendo i volumi con autore o titolo corrispondenti (/?q=testo)
    if (q) {
        return library.books.filter(
            (b) => b.author.includes(q) || b.title.includes(q)
        );
    } else {
        // altrimenti restituisce l'intero array books
        return library.books;
    }
}

const routes = {
    "/": {
        getText: () => library.message,
        getJson: () => {
            return JSON.stringify({ message: library.message });
        },
    },
    "/books": {
        getText: (q) => {
            return findBooks(q).reduce((acc, cur) => {
                acc += `${cur.author} - ${cur.title}\n`;
                return acc;
            }, "");
        },
        getJson: (q) => {
            return JSON.stringify(findBooks(q));
        },
    },
};

const server = http.createServer((req, res) => {
    // per permettere al server di accettare richieste con query params è necessario dividere la parte di path da quella di query
    // grazie alla classe URL possiamo modificare il codice del server per ottenere il path e la query in modo separato
    // pathname contiene il path e che usiamo per effettuare il routing
    // searchParams è un oggetto che contiene tutti i parametri presenti nella query
    const { pathname, searchParams } = new URL(
        req.url,
        `http://${req.headers.host}` // stringa che rappresenza la parte iniziale dell'url usato per fare la richiesta
    );

    const route = routes[pathname];
    if (!route) {
        res.statusCode = 404;
        res.end();
        return;
    }

    if (req.method === "HEAD") {
        res.statusCode = 204;
        res.end();
    } else if (req.method === "GET") {
        const accepts = getAcceptedTypes(req);
        // usiamo il metodo get(nomeParametro) esposto dall'oggetto searchParams per ottenere il valore del parametro q che usiamo come
        // argomento delle funzioni per ottenere il corpo della risposta HTTP
        const q = searchParams.get("q");
        if (accepts.json) {
            resJson(res, route.getJson(q));
        } else if (accepts.textPlain || accepts.text || accepts.any) {
            resText(res, route.getText(q));
        } else {
            res.statusCode = 406;
            res.end();
        }
    } else {
        res.statusCode = 405;
        res.end();
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});

// provare ad accedre all'indirizzo http://127.0.0.1/books?q=mondo e vedere l'elenco di libri corrispondenti
