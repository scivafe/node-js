// node espone tutte le API del modulo fs anche in versione Promise. Tali funzioni non accettano la callback ma si prevede siano
// seguite da un .then(). Altra differenza è il nome del modulo da importare per usarle: fs/promises
const fs = require("fs/promises");

const QUOTES_DIR = process.argv[2];

fs.readdir(QUOTES_DIR, { withFileTypes: true }) // leggi il contenuto della cartella indicata
    .then((files) => {
        // poi scegli il file e leggine il contenuto
        const txtFiles = files
            .filter((f) => f.isFile() && f.name.endsWith(".txt"))
            .map((f) => f.name);

        const randomIdx = Math.floor(Math.random() * txtFiles.length);
        const quoteFile = `${QUOTES_DIR}/${txtFiles[randomIdx]}`;

        return fs.readFile(quoteFile, "utf-8");
    })
    .then((data) => {
        // poi stampane il contenuto
        console.log(data.toString());
    })
    .catch((err) => {
        // se durante il processo si verifica un errore stampa il messaggio di errore ed esci
        // err rappresenta l'errore che si è verificato ed .message contiene la descrizione del problema
        console.error(`Error: ${err.message}`);
        process.exitCode = 1;
        return;
    });
