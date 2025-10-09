// Con un file .mjs stiamo dicendo a node che tale file è un modulo ecmascript e non un modulo classico e questo tipo di modulo
// permette l'uso di await al livello più alto del codice senza doverlo racchiudere in una funzione async
// possiamo riscrivere la versione basata su Promise usando async/await
import fs from "fs/promises";

const QUOTES_DIR = process.argv[2];

// con il blocco try/catch catturiamo gli errori e configuriamo il codice di uscita
try {
    // ogni funzione che restituisce una Promise viene eseguita con await
    const files = await fs.readdir(QUOTES_DIR, { withFileTypes: true });
    const txtFiles = files
        .filter((f) => f.isFile() && f.name.endsWith(".txt"))
        .map((f) => f.name);

    const randomIdx = Math.floor(Math.random() * txtFiles.length);
    const quoteFile = `${QUOTES_DIR}/${txtFiles[randomIdx]}`;

    const data = await fs.readFile(quoteFile, "utf-8");
    console.log(data.toString());
} catch (err) {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
}
