const Error = require('../models/Error');
const LinkedList = require('./LinkedList');

class ReportErrors {
    constructor(Errors) {
        this.Errors = Errors;
        this.errorList = new LinkedList();
        this.updateList();
    }

    updateList() {
        for (let index = 0; index < this.Errors.toArray().length; index++) {
            const element = this.Errors.toArray()[index];
            this.errorList.append(new Error(element.getId, element.getType, element.getDescription, element.getColumn, element.getRow));
        }
        this.Errors.deleteAll();

    }

    getReport() {
        let reportErrors = "";
        /*reportErrors += "<!DOCTYPE html>\n";
        reportErrors += '<html lang="en">\n';
        reportErrors += '<head>\n';
        reportErrors += '\t<title>Report Errors HTML</title>\t\n';
        reportErrors += '<meta charset="utf-8">\n\t';
        reportErrors += '<meta name="viewport" content="width=device-width, initial-scale=1">\n\t'
        reportErrors += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">\n\t';
        reportErrors += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\n\t';
        reportErrors += '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>\n\t';
        reportErrors += '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>\n\t';
        reportErrors += '</head>\n\t';
        reportErrors += '<body style="background-color: green;">\n\t';
        reportErrors += '<div class="container">\n\t';
        reportErrors += '<h1 style="text-align: center; color: aqua; background-color: blue;">Report Errors</h1>\n\t';
        reportErrors += '<table class="table" style="background-color: cadetblue;">\n\t';
        reportErrors += '<thead class="thead-dark">\n\t';
        reportErrors += '<tr>\n\t';
        reportErrors += '<TH> ID </TH>';
        reportErrors += '<TH> Tipo</TH>'
        reportErrors += '<TH> Descripcion</TH>';
        reportErrors += '<TH> Fila  </TH>';
        reportErrors += '<TH> Columna </TH>';
        reportErrors += '</TR>';
        reportErrors += '</thead>';
        reportErrors += '<tbody>';*/
        for (let index = 0; index < this.errorList.toArray().length; index++) {
            const element = this.errorList.toArray()[index];
            reportErrors += "<TR>";
            reportErrors += "<TH>" + element.getId + "</TH>";
            reportErrors += "<TH>" + element.getType + "</TH>";
            reportErrors += "<TH>" + element.getDescription + "</TH>";
            reportErrors += "<TH>" + element.getRow + "</TH>";
            reportErrors += "<TH>" + element.getColumn + "</TH>";
            reportErrors += "</TR>";
        }
        /*reportErrors += '</tbody>';
        reportErrors += '</table>';
        reportErrors += '</div>';
        reportErrors += '</body>';
        reportErrors += '</html>';*/
        return reportErrors;
    }

}

module.exports = ReportErrors;