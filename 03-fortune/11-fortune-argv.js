const fs = require("fs");

// passiamo il nome della cartella come argomento quando eseguiamo l'applicazione
// argv è un array contenente tutti gli argomenti passati al processo node al suo avvio (es. > node 11-fortune-argv.js ./filosofia)
// Il primo elemento di argv è il path assoluto all'eseguibile che ha avviato il processo node, mentre dal secondo in poi sono
// i parametri (stringhe) passati al programma da eseguire (in questo caso il nome della cartella in cui leggere le citazioni)
const QUOTES_DIR = process.argv[2];

fs.readdir(QUOTES_DIR, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.error(`Error while reading ${QUOTES_DIR} directory`);
        process.exitCode = 1;
        return;
    }

    const txtFiles = files
        .filter((f) => f.isFile() && f.name.endsWith(".txt"))
        .map((f) => f.name);

    const randomIdx = Math.floor(Math.random() * txtFiles.length);
    const quoteFile = `${QUOTES_DIR}/${txtFiles[randomIdx]}`;

    fs.readFile(quoteFile, "utf-8", (err, data) => {
        if (err) {
            console.error(`Error while reading ${quoteFile} file`);
            process.exitCode = 1;
            return;
        }
        console.log(data.toString());
    });
});
