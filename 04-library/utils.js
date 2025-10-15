// resJson e resText ricevono come parametri l'oggetto res e il dato da inviare con la funzione res.end()
// in questo modo possono essere usate per inviare qualsiasi contenuto che passeremo in input
function resJson(res, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(data);
}
function resText(res, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(data);
    res.end();
}
function resHtml(res, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(data);
}
// la funzione getAcceptedTypes() riceve in input l'oggetto della richiesta e restituisce un oggetto con alcune proprietà booleane
// le quali indicano se un certo tipo di formato è accettato o meno dalla richiesta
function getAcceptedTypes(req) {
    const acceptHeaderVal = req.headers.accept || "*/*";
    // ["text/html", "application/xml;q=0.9", ...]
    const acceptList = acceptHeaderVal.split(",");
    // ["text/html", "application/xml", ...]
    const acceptedTypes = acceptList.map((a) => a.split(";")[0]);

    const json = acceptedTypes.includes("application/json");
    const textPlain = acceptedTypes.includes("text/plain");
    const textHtml = acceptedTypes.includes("text/html");
    const text = acceptedTypes.includes("text/*");
    const any = acceptedTypes.includes("*/*");
    return { json, textPlain, textHtml, text, any };
}
// le funzioni vengono esportate dal modulo per poi essere importate nel file in cui ci serviranno
module.exports = { resJson, resText, resHtml, getAcceptedTypes };
