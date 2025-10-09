const fs = require("fs"); // importiamo modulo fs

// readFile accetta tre parametri: il primo è il path del file (che può essere relativo o assoluto),
// il secondo rappresenta le opzioni di lettura del file
// e il terzo è  la funzione di callback da eseguire dopo che l'operazione di lettura è stata completata
fs.readFile("./data/003.txt", "utf-8", (err, data) => {
    if (err) {
        // err contiene l'eventuale errore verificatesi durante la lettura del file
        console.log("Error while reading quote file");
        return;
    }
    console.log(data);
});
