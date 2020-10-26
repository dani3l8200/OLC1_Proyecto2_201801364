const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AnalizadorLexico = require('./util/AnalizadorLexico');

let analisis = new AnalizadorLexico();

app.use(bodyParser.json())

app.set('port', process.env.PORT || 5000);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    next();
});


app.post('/AnalizadorLexico', (request, response) => {
    var entra = request.body.entra
    console.log(entra);
    response.send(analisis.AnalisisLexico(entra));
})

app.get('/GetListTokens', (request, response) => {
    if (!analisis.ListErrors) {
        analisis.ListErrors.print();
    } else {
        response.send(analisis.ListTokens.print());
    }
})
app.listen(app.get('port'), () => {
    console.log("Backend inicializado");
});