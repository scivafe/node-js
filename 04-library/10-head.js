const http = require("http");
const { getAcceptedTypes, resJson, resText } = require("./utils");

const host = "127.0.0.1";
const port = 3000;

const library = {
    message: "Benvenuto nella biblioteca HTTP",
    books: [
        { author: "Naomi Klein", title: "Shock economy" },
        { author: "Serge Latouche", title: "L'invenzione dell'economia" },
        {
            author: "Yanis Varoufakis",
            title: "È l'economia che cambia il mondo",
        },
    ],
};

const routes = {
    "/": {
        getText: () => library.message,
        getJson: () => {
            return JSON.stringify({ message: library.message });
        },
    },
    "/books": {
        getText: () =>
            library.books.reduce((acc, cur) => {
                acc += `${cur.author} - ${cur.title}\n`;
                return acc;
            }, ""),
        getJson: () => {
            return JSON.stringify(library.books);
        },
    },
};

const server = http.createServer((req, res) => {
    const route = routes[req.url];
    if (!route) {
        res.statusCode = 404;
        res.end();
        return;
    }

    // dopo aver controllato se l'url richiesto è disponibile, usiamo la proprietà req.method per sapere con quale metodo è stata
    // fatta la richiesta
    // HEAD non prevede l'invio della risorsa richiestav ma solo degli header associati
    if (req.method === "HEAD") {
        res.statusCode = 204; // risposta vuota (no content), ossia la risorsa esiste ma non verrà inviata nella risposta
        res.end();
        // se il metodo richiesto è GET il flusso di esecuzione è qello principale in cui viene restituita la risorsa contenuta
        // nell'oggetto route in base al formato richiesto
    } else if (req.method === "GET") {
        const accepts = getAcceptedTypes(req);
        if (accepts.json) {
            resJson(res, route.getJson());
        } else if (accepts.textPlain || accepts.text || accepts.any) {
            resText(res, route.getText());
        } else {
            res.statusCode = 406;
            res.end();
        }
    } else {
        res.statusCode = 405; // method not allowed (metodo non permesso per la risorsa indicata)
        res.end();
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
