const fs = require("fs");

const QUOTES_DIR = "./data";

// readdir legge i nomi dei file contenuti nella directory passata in input
fs.readdir(QUOTES_DIR, (err, files) => {
    if (err) {
        console.log("Error while reading data directory");
        return;
    }

    const randomIdx = Math.floor(Math.random() * files.length);
    const quoteFile = `${QUOTES_DIR}/${files[randomIdx]}`;

    fs.readFile(quoteFile, "utf-8", (err, data) => {
        // legge contenuto del file
        if (err) {
            console.log("Error while reading quote file");
            return;
        }
        console.log(data.toString());
    });
});
