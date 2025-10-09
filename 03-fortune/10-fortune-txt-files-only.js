const fs = require("fs");

const QUOTES_DIR = "./data";

// readdir restituisce un elenco di tutto quello che trova nella cartella indicata, incluse ulteriori cartelle
// per evitare che file diversi da quelli di testo finiscano per essere usati come input della chiamata readFile è necessario filtrarli
// prima di selezionarne uno
// L'opzione withFileTypes permette di ottenere più informazioni riguardanti i file della cartella
fs.readdir(QUOTES_DIR, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.error(`Error while reading ${QUOTES_DIR} directory`);
        process.exitCode = 1;
        return;
    }

    // passando in readdir withFileTypes: true, l'array di file ricevuto dalla callback non è più fatto da stringhe, ma da oggetti
    // di tipo Dirent, dal quale usiamo la property .name e il metodo .isFile()
    const txtFiles = files
        // con filter filtriamo l'array e filtriamo solo i file con estensione .txt
        .filter((f) => f.isFile() && f.name.endsWith(".txt"))
        .map((f) => f.name); // con .map otteniamo un nuovo array contenente i nomi dei file

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
