const Token = require('../models/Token');
const LinkedList = require('./LinkedList');
class ReportLexico {
    constructor(tokens) {
        this.tokens = tokens;
        this.tokenList = new LinkedList();
        this.updateList();
    }

    updateList(){
        for (let index = 0; index < this.tokens[2].toArray().length; index++) {
            const element = this.tokens[2].toArray()[index];
            this.tokenList.append(new Token(element.getIdToken(),element.getType(),element.getLexem(), element.getRow(), element.getColumn()));
        }
            
        
    }

    getReport(){
        let reportTokens = "";
        /*reportTokens += "<!DOCTYPE html>\n";
        reportTokens += '<html lang="en">\n';
        reportTokens += '<head>\n';
        reportTokens += '\t<title>Report Tokens HTML</title>\t\n';
        reportTokens += '<meta charset="utf-8">\n\t';
        reportTokens += '<meta name="viewport" content="width=device-width, initial-scale=1">\n\t'
        reportTokens += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">\n\t';
        reportTokens += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\n\t';
        reportTokens += '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>\n\t';
        reportTokens += '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>\n\t';
        reportTokens += '</head>\n\t';
        reportTokens += '<body style="background-color: green;">\n\t';
        reportTokens += '<div class="container">\n\t';
        reportTokens += '<h1 style="text-align: center; color: aqua; background-color: blue;">Report Tokens</h1>\n\t';
        reportTokens += '<table class="table" style="background-color: cadetblue;">\n\t';
        reportTokens += '<thead class="thead-dark">\n\t';
        reportTokens += '<tr>\n\t';
        reportTokens += '<TH> ID </TH>';
        reportTokens += '<TH> Tipo</TH>'
        reportTokens += '<TH> Token</TH>';
        reportTokens += '<TH> Fila  </TH>';
        reportTokens += '<TH> Columna </TH>';
        reportTokens += '</TR>';
        reportTokens += '</thead>';
        reportTokens += '<tbody>';*/
        for (let index = 0; index < this.tokenList.toArray().length; index++){
            const element = this.tokenList.toArray()[index];
            reportTokens += "<TR>";
            reportTokens += "<TH>" +  element.getIdToken() + "</TH>"; 
            reportTokens += "<TH>" +  element.getType() + "</TH>"; 
            reportTokens += "<TH>" +  element.getLexem() + "</TH>";
            reportTokens += "<TH>" +  element.getRow() + "</TH>";
            reportTokens += "<TH>" +  element.getColumn() + "</TH>";
            reportTokens += "</TR>";
        }
        /*reportTokens += '</tbody>';
        reportTokens += '</table>';
        reportTokens += '</div>';
        reportTokens += '</body>';
        reportTokens += '</html>';*/
        return reportTokens;
    }

}

module.exports = ReportLexico;