/* Global variables */
var astData = '';
var ast2Data = '';
var consoleReports = '';
var fileContent = '';
var errorsList = '';
var listaTokens = '';
/* END -- Global variables */



/* Component initialization */
var principalEditor = CodeMirror.fromTextArea(document.getElementById('principalEditor'), {
    theme: 'dracula',
    mode: "text/x-java",
    lineNumbers: true,
    lineWrapping: false,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true
});

var comparatorEditor = CodeMirror.fromTextArea(document.getElementById('comparatorEditor'), {
    theme: 'dracula',
    mode: "text/x-java",
    lineNumbers: true,
    lineWrapping: false,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true
});

var consoleEditor = CodeMirror.fromTextArea(document.getElementById('consoleEditor'), {
    theme: 'dracula',
    lineWrapping: false,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
    readOnly: true
});
consoleEditor.setSize(null, '87vh');
/* END -- Component initialization */



/* Upload and read file */
document.getElementById('input-principalFile').addEventListener('change', getPrincipalFile);
document.getElementById('input-secondaryFile').addEventListener('change', getSecondaryFile);

function getPrincipalFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        placeFileContent(
            principalEditor, // Editor
            input.files[0]);
    }
}

function getSecondaryFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        placeFileContent(
            comparatorEditor, // Editor
            input.files[0]);
    }
}

function placeFileContent(target, file) {
    readFileContent(file).then(content => {
        target.getDoc().setValue(content);
    }).catch(error => console.log(error))
}

function readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    })
}
/* END -- Upload and read file */



/* AST */
function generateAST(dots) {
    $('#astDiv').html('');
    var graphviz = d3.select("#astDiv").graphviz()
        .transition(function() {
            return d3.transition("main")
                .ease(d3.easeLinear)
                .delay(500)
                .duration(1500);
        })
        .logEvents(true)
        .on("initEnd", render);

    function render() {

        graphviz
            .renderDot(dots)

    }
}


/* END -- AST */



/* Download files */
document.getElementById('saveFile').onclick = function() {
    var data = principalEditor.getDoc().getValue();
    writeContent(data, 'mainFile.java', 'text/java');
}

document.getElementById('saveFileCompare').onclick = function() {
    var data = comparatorEditor.getDoc().getValue();
    writeContent(data, 'comparedFile.java', 'text/java');
}

document.getElementById('errorReport').onclick = function() {
    generateErrorReport(errorsList, 'ReportErrors');
}

document.getElementById('traduccion').onclick = function() {
    writeContent(consoleReports, 'traduccion.js', 'text/js')
}

document.getElementById('tokenReport').onclick = function() {
        generateTokensReport(listaTokens, "ReportTokens");
    }
    /* END -- Download files */



/* Create download file */
function writeContent(content, fileName, contentType) {
    var a = document.createElement('a');
    var file = new Blob([content], {
        type: contentType
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
};
/* END -- Create download file */



/* HTML report structure */
function header() {
    fileContent = '';
    fileContent += '<!doctype html>';
    fileContent += '<html lang=\"es\">';
    fileContent += '<head>';
    fileContent += '<meta charset=\"utf - 8\">';
    fileContent += '<meta name=\"viewport\" content=\"width = device - width, initial - scale = 1, shrink - to - fit = no\">';
    fileContent += '<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css\">';
    fileContent += '<link rel=\"stylesheet\" href=\"https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css\">';
}

function footer() {
    fileContent += '<script src=\"https://code.jquery.com/jquery-3.3.1.js\"></script>';
    fileContent += '<script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>';
    fileContent += '<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>';
    fileContent += '<script src=\"https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js\"></script>';
    fileContent += '<script src=\"https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js\"></script>';
    fileContent += '<script> $(document).ready(function () {$(\'#example\').DataTable();});</script>';
    fileContent += '</body>';
    fileContent += '</html>';
}

function generateErrorReport(errorList, fileName) {
    header();
    fileContent += '<title>Errors</title>';
    fileContent += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">\n\t';
    fileContent += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\n\t';
    fileContent += '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>\n\t';
    fileContent += '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>\n\t';
    fileContent += '</head>';
    fileContent += '<body style="background-color: green;">';
    fileContent += '<div class=\"container\"><br>';
    fileContent += '<h1 style="text-align: center; color: aqua; background-color: blue;">List of Errors</h1><hr>';
    fileContent += '<table id=\"example\"  class="table" style="background-color: cadetblue;">';
    fileContent += '<thead  class="thead-dark" ><tr><th>#</th><th>Type</th><th>Description</th><th>Row</th><th>Column</th></tr></thead>';
    fileContent += '<tbody>';
    fileContent += errorList;
    fileContent += '</tbody>';
    fileContent += '</table>';
    fileContent += '</div>';
    footer();
    writeContent(fileContent, fileName + '.html', 'text/html');
}

function generateTokensReport(tokenList, fileName) {
    header();
    fileContent += '<title>Tokens</title>';
    fileContent += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">\n\t';
    fileContent += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\n\t';
    fileContent += '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>\n\t';
    fileContent += '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>\n\t';
    fileContent += '</head>';
    fileContent += '<body style="background-color: yellow;">';
    fileContent += '<div class=\"container\"><br>';
    fileContent += '<h1 style="text-align: center; color: aqua; background-color: orange;">List of Tokens</h1><hr>';
    fileContent += '<table id=\"example\"  class="table" style="background-color: cadetblue;">';
    fileContent += '<thead  class="thead-dark" ><tr><th>#</th><th>Token</th><th>Lexema</th><th>Row</th><th>Column</th></tr></thead>';
    fileContent += '<tbody>';
    fileContent += tokenList;
    fileContent += '</tbody>';
    fileContent += '</table>';
    fileContent += '</div>';
    footer();
    writeContent(fileContent, fileName + '.html', 'text/html');
}
/* END -- HTML report structure */



/* Console reports*/



function TraduccionJS(data) {
    consoleReports += data;
}
/*END -- Console reports*/



/* Conection */
function sendData() {
    var url = 'http://localhost:3000/TraductorJS';

    consoleEditor.getDoc().setValue('');

    if (principalEditor.getDoc().getValue().length > 0) {
        var files = {
            'mainFile': principalEditor.getDoc().getValue()
        }

        $.post(url, files, function(res, status) {
            console.log(status);
            if (status.toString() == 'success') {
                if (res.hasOwnProperty('errors')) {
                    var errorsJSON = res.errors;
                    errorsList = "";
                    errorsList = errorsJSON.errorsS
                    generateErrorReport(errorsList, 'ReportErrors');
                } else {
                    var dataJSON = res.data;
                    consoleReports = "";
                    listaTokens = "";
                    var traduccion = dataJSON.Traduccion;
                    var stringAST = dataJSON.AstDot;
                    listaTokens = dataJSON.Tokens;
                    TraduccionJS(traduccion)
                    generateAST(stringAST);
                    generateTokensReport(listaTokens, 'ReportTokens')
                    consoleEditor.getDoc().setValue(consoleReports);

                }
            } else {
                alert('Error');
            }
        });
    }
}
/* END -- Conection */