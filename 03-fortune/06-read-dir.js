const fs = require("fs");

fs.readdir("./data", (err, files) => {
    if (err) {
        console.log("Error while reading data directory");
        return;
    }
    // files è l'elenco dei file trovati nella cartella (sono solo i nomi dei file trovati)
    console.log(files);
});
