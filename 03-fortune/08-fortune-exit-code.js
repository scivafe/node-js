// &? -> variabile standard in cui viene salvato l'exit code dell'ultimo processo eseguito.
// Un valore diverso da 0 indica che c'è stato un problema durante l'esecuzione.
// Il codice 1 indica un errore generico e si usa per segnalare che l'applicazione è terminata a causa di un problema
const fs = require("fs");

const QUOTES_DIR = "./data";

fs.readdir(QUOTES_DIR, (err, files) => {
    if (err) {
        console.log("Error while reading data directory");
        // l'oggetto process contiene informazioni sul processo node che sta eseguendo il codice
        process.exitCode = 1;
        return;
    }

    const randomIdx = Math.floor(Math.random() * files.length);
    const quoteFile = `${QUOTES_DIR}/${files[randomIdx]}`;

    fs.readFile(quoteFile, "utf-8", (err, data) => {
        if (err) {
            console.log("Error while reading quote file");
            process.exitCode = 1;
            return;
        }
        console.log(data);
    });
});
