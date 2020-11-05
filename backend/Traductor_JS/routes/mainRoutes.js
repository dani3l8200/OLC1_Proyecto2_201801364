const express = require('express');
const parser = require('../util/Gramatica')
const ReportLexico = require('../controllers/ReportLexico');
const ReportErrors = require('../controllers/ReportErrors');
const ASTReport = require('../controllers/GraficasASTJS');
const beautify = require('js-beautify').js;
let Router = express.Router();
Router.get('/', (req, res) => {
    res.send('Traductor JS/Python');
})

Router.post('/TraductorJS', (req, res) => {
    let data = req.body
    try {
        let auxData = JSON.stringify(data['mainFile']);
        let test = JSON.parse(auxData)
        const arrayReturnToString = parser.parse(test);
        if (arrayReturnToString.length > 1 && arrayReturnToString.length <= 3) {
            
            let ast = new ASTReport();
            let astString = ast.generateString(arrayReturnToString[0]);
            let lexico = new ReportLexico(arrayReturnToString[2]);
            let reportLexico = lexico.getReport();
            let traduccion = beautify(arrayReturnToString[1],{ indent_size: 4, space_in_empty_paren: true, "space_after_anon_function": true, "space_after_named_function": true,"brace_style": "collapse"});
            console.log(traduccion);
            let results = {
                'AstDot': astString,
                'Traduccion': traduccion,
                'Tokens': reportLexico
            }
            arrayReturnToString[1] = "";
            res.status(200).send({
                code: '200',
                data: results
            })

        } else if (arrayReturnToString.length == 1) {
            let errorA = new ReportErrors(arrayReturnToString[0]);
            let reportErrors = errorA.getReport();
            console.log(reportErrors);
            let results = {
                'errorsS': reportErrors
            }
            res.status(200).send({
                code: '200',
                errors: results
            })
        } else {
            res.status(500).send('Error en el parsing');
            console.log('error parsing');
        }
    } catch (error) {
        console.log(error);
        return;
    }
})


module.exports = Router;