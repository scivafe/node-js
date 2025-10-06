const quote =
  "Any app that can be written in JavaScript, will eventually be written in JavaScript. Jeff Atwood";

const quotes2 = [
  // template literal
  `Any app that can be written in JavaScript,
  will eventually be written in JavaScript. 
                              -- Jeff Atwood
  `,
  `JavaScript is the only language that I'm aware
  of that people feel they don't need to learn before
  they start using it.
                              -- JDouglas Crockford
  `,
  `Code never lies, comments sometimes do.
                              -- Anonymous
  `,
];

// require si usa èer caricare moduli JavaScript e non normali file (a parte i .json)
const quotes = require("./quotes.json");

// valore dell'indice compreso tra 0 e lunghezza dell'array
// Math.floor estrae dal numero generato con .random la parte intera
const randomIdx = Math.floor(Math.random() * quotes.lenght);

// per ottenere valori casuali utilizzabili per applicazione crittografiche:
// crypto.getRandomValues()

console.log(quotes[randomIdx]);

// json.parse() -> riceve in input una stringa json e la trasforma nell'oggetto o valore JavaScript (deserializzazione)
// json.stringify() -> trasforma un oggetto JavaScript in una stringa json (serializzazione)
