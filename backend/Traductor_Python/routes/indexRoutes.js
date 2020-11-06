const express = require('express');
const parser = require('../util/SintacticoPY');
const lexer = require('../util/AnalizadorLexico');
const ReportLexico = require('../controllers/ReportLexico');
const ReportErrors = require('../controllers/ReportErrors');
const astReport = require('../controllers/GraficarAST');
let Router = express.Router();

Router.get('/', (req, res) => {
    res.send('Traductor Python');
})

Router.post('/TraductorPY', (req, res) => {
    let data = req.body;
    try {
        let auxData = JSON.stringify(data['pyFile']);
        let test = JSON.parse(auxData);
        let lexico = new lexer();
        console.log(test);
        lexico.AnalisisLexico(test);
        let listaTokens = lexico.ListTokens;
        let listaErrors = lexico.ListErrors;
        let resultParser = new parser(listaTokens, listaErrors);
        console.log(resultParser.errorList.toArray().length);
        if (resultParser.errorList.toArray().length > 0) {
            let errors = new ReportErrors(resultParser.errorList);
            let errorReport = errors.getReport();
            console.log(errorReport);
            let results = {
                'errorsS': errorReport
            }
            res.status(200).send({
                code: '200',
                errors: results
            })
        } else if (resultParser.errorList.toArray().length === 0) {
            let ast = new astReport();
            let astString = ast.generateString(resultParser.ast);
            //  console.log(astString);
            //listaTokens.print();
            let lexico = new ReportLexico(listaTokens);
            let reportLexico = lexico.getReport();
            let traduccion = resultParser.traductor.text;
            console.log(resultParser.traductor.text);
            let results = {
                'AstDot': astString,
                'Traduccion': traduccion,
                'Tokens': reportLexico
            }
            res.status(200).send({
                code: '200',
                data: results
            })
        }

    } catch (error) {
        console.log(error);
        return;
    }
})

module.exports = Router;