//const parser = require('./util/Gramatica');
//const listaTest = require('./util/Gramatica').listTokens;
//const GraficasASTJS = require('./controllers/GraficasASTJS');
//var fs = require('fs');
//const ReportLexico = require('./controllers/ReportLexico');
//const ReportErrors = require('./controllers/ReportErrors');
//var beautify = require('js-beautify').js;
//let txt = ` public class intento {
// public int ask(){
// }
//}
/*`
var filename = __dirname + "/output.js";
var test = parser.parse(txt)

if(test.hasOwnProperty('Error')){
  console.log('dsa');
}
var auxNodo = test[0];  
let traduccion = test[1];
var auxLista = new ReportErrors(test);

fs.writeFileSync('ReportErrors.html',auxLista.getReport());

fs.writeFileSync(filename, traduccion, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Archivo Creado");
    }
})

let graficadora = new GraficasASTJS();
fs.writeFileSync("archivo.txt",graficadora.generateString(auxNodo));


 




var traduccion2 = fs.readFileSync(filename).toString();
var formattedCode = beautify(traduccion2,{ indent_size: 4, space_in_empty_paren: true, "space_after_anon_function": true, "space_after_named_function": true,"brace_style": "collapse"});
fs.writeFileSync(filename,formattedCode);
`*/

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const mainRoutes = require('./routes/mainRoutes');

let app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use(express.urlencoded({
  extended: true
}));
app.use('/', mainRoutes);
app.listen(app.get('port'), () => {
  console.log('Listening On', app.get('port'));
})