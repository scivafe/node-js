// require si usa per caricare moduli JavaScript e non normali file (a parte i .json)
const quotes = require("./quotes.json");

const randomIdx = Math.floor(Math.random() * quotes.length);

console.log(quotes[randomIdx]);
// json.parse() -> riceve in input una stringa json e la trasforma nell'oggetto o valore JavaScript (deserializzazione)
// json.stringify() -> trasforma un oggetto JavaScript in una stringa json (serializzazione)
