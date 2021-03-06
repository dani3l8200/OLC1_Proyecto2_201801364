const Token = require('../models/Token')
const LinkedList = require('../controllers/LinkedList');
const Errors = require('../models/Error');
const SyntacticAnalyzer = require('./SintacticoPY');
const GraficasAST = require('../controllers/GraficarAST');



class AnalizadorLexico {
    constructor() {
        this.state = 0;
        this.idToken = 0;
        this.idErrors = 0;
        this.auxLex = "";
        this.column = 0;
        this.row = 1;
        this.ListTokens = new LinkedList();
        this.ListErrors = new LinkedList();
    }

    VerifyReserved() {
        switch (this.auxLex) {
            case "public":
                return "TK_PUBLIC";
            case "class":
                return "TK_CLASS";
            case "interface":
                return "TK_INTERFACE";
            case "void":
                return "TK_VOID";
            case "int":
                return "TK_INT";
            case "double":
                return "TK_DOUBLE";
            case "String":
                return "TK_STRING";
            case "char":
                return "TK_CHAR";
            case "for":
                return "TK_FOR";
            case "while":
                return "TK_WHILE";
            case "boolean":
                return "TK_BOOLEAN";
            case "false":
                return "TK_FALSE";
            case "true":
                return "TK_TRUE";
            case "do":
                return "TK_DO";
            case "if":
                return "TK_IF";
            case "else":
                return "TK_ELSE";
            case "continue":
                return "TK_CONTINUE";
            case "break":
                return "TK_BREAK";
            case "return":
                return "TK_RETURN";
            case "static":
                return "TK_STATIC";
            case "main":
                return "TK_MAIN";
            case "System":
                return "TK_SYSTEM";
            case "out":
                return "TK_OUT";
            case "println":
                return "TK_PRINTLN";
            case "print":
                return "TK_PRINT";
            default:
                return "TK_ID";
        }
    }

    AnalisisLexico(entra) {
        entra += "#"
        for (let index = 0; index < entra.length; index++) {
            let letra = entra[index];
            switch (this.state) {
                case 0:
                    if (letra === '\t' || letra === '\r' || letra === '\b' || letra === '\f' || letra === ' ') {
                        this.state = 0;
                    } else if (letra === '\n') {
                        this.row += 1;
                        this.state = 0;
                    } else if ((letra.charCodeAt(0) >= 65 && letra.charCodeAt(0) <= 90) || (letra.charCodeAt(0) >= 97 && letra.charCodeAt(0) <= 122)) {
                        this.state = 1;
                        this.auxLex += letra;
                        this.column += 1;
                    } else if ((letra.charCodeAt(0) >= 48 && letra.charCodeAt(0) <= 57)) {
                        this.state = 2;
                        this.auxLex += letra;
                        this.column += 1;
                    } else if (letra === '"') {
                        this.state = 4;
                        this.auxLex += letra;
                        this.column += 1;
                    } else if (letra === "{") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_LLAVEA");
                    } else if (letra === "}") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_LLAVEC");
                    } else if (letra === "/") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 5;
                    } else if (letra === "%") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_PORCENTAJE");
                    } else if (letra === "(") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_PARENTESISA");
                    } else if (letra === ")") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_PARENTESISC");
                    } else if (letra === ",") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_COMA");
                    } else if (letra === ".") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_PUNTO");
                    } else if (letra === ";") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_PUNTOCOMA");
                    } else if (letra === ">") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 9;
                    } else if (letra === "<") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 10;
                    } else if (letra === "=") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 11;
                    } else if (letra === "!") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 12;
                    } else if (letra === "+") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 13;
                    } else if (letra === "-") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 14;
                    } else if (letra === "&") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 15;
                    } else if (letra === "|") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 16;
                    } else if (letra === "'") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 17;
                    } else if (letra === "^") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_XOR");
                    } else if (letra === "*") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_PRODUCT")
                    } else if (letra === "]") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_CORC");
                    } else if (letra === "[") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_CORA");
                    } else {
                        if (letra === "#" && index === (entra.length - 1)) {
                            console.log("se finalizo el analisis lexico");
                        } else {
                            this.auxLex += letra;
                            this.addErrors("CARACTER_DESCONOCIDO")
                        }
                    }
                    break;
                case 1:
                    if ((letra.charCodeAt(0) >= 65 && letra.charCodeAt(0) <= 90) || (letra.charCodeAt(0) >= 97 && letra.charCodeAt(0) <= 122)) {
                        this.auxLex += letra;
                        this.state = 1;
                    } else if ((letra.charCodeAt(0) >= 48 && letra.charCodeAt(0) <= 57)) {
                        this.auxLex += letra;
                        this.state = 1;
                    } else if (letra === "_") {
                        this.auxLex += letra;
                        this.state = 1;
                    } else {
                        const auxTipo = this.VerifyReserved();
                        this.addTokens(auxTipo);
                        index--;
                    }
                    break;
                case 2:
                    if ((letra.charCodeAt(0) >= 48 && letra.charCodeAt(0) <= 57)) {
                        this.auxLex += letra;
                        this.state = 2;
                    } else if (letra === '.') {
                        this.auxLex += letra;
                        this.state = 3;
                    } else {
                        this.addTokens("TK_NUMEROS");
                        index--;
                    }
                    break;
                case 3:
                    if ((letra.charCodeAt(0) >= 48 && letra.charCodeAt(0) <= 57)) {
                        this.auxLex += letra;
                        this.state = 3;
                    } else {
                        this.addTokens("TK_DECIMAL")
                        index--;
                    }
                    break;
                case 4:
                    if (letra != '"') {
                        this.auxLex += letra;
                        this.state = 4;
                    } else {
                        this.auxLex += "\\" + letra;
                        this.addTokens("TK_CADENA");
                    }
                    break;
                case 5:
                    if (letra === "/") {
                        this.state = 6;
                        this.auxLex += letra;
                    } else if (letra === "*") {
                        this.state = 7;
                        this.auxLex += letra;
                    } else {
                        this.addTokens("TK_DIVISION");
                        index--;
                    }
                    break;
                case 6:
                    if (letra != "\n") {
                        this.auxLex += letra;
                        this.state = 6;
                    } else {
                        this.auxLex += letra;
                        this.addTokens("TK_COMENTARIO_UNILINEA");
                        index--;
                    }
                    break;
                case 7:
                    if (letra != "*") {
                        this.auxLex += letra;
                        this.state = 7;
                    } else {
                        this.auxLex += letra;
                        this.state = 8;
                    }
                    break;
                case 8:
                    if (letra != "/") {
                        this.state = 8;
                        this.auxLex += letra;
                    } else {
                        this.auxLex += letra;
                        this.addTokens("TK_COMENTARIO_MULTILINEA");
                    }
                    break;
                case 9:
                    if (letra === "=") {
                        this.auxLex += letra
                        this.addTokens("TK_MAYORIGUAL");
                    } else {
                        this.addTokens("TK_MAYOR");
                        index--;
                    }
                    break;
                case 10:
                    if (letra === "=") {
                        this.auxLex += letra;
                        this.addTokens("TK_MENORIGUAL");
                    } else {
                        this.addTokens("TK_MENOR");
                        index--;
                    }
                    break;
                case 11:
                    if (letra === "=") {
                        this.auxLex += letra;
                        this.addTokens("TK_COMPARACION")
                    } else {
                        this.addTokens("TK_IGUAL");
                        index--;
                    }
                    break;
                case 12:
                    if (letra === "=") {
                        this.auxLex += letra;
                        this.addTokens("TK_DISTINTO");
                    } else {
                        this.addTokens("TK_NOT");
                        index--;
                    }
                    break;
                case 13:
                    if (letra === "+") {
                        this.auxLex += letra;
                        this.addTokens("TK_INCREMENTO");
                    } else if (letra === "=") {
                        this.auxLex += letra;
                        this.addTokens("TK_CONCATENAR");
                    } else {
                        this.addTokens("TK_MAS");
                        index--;
                    }
                    break;
                case 14:
                    if (letra === "-") {
                        this.auxLex += letra;
                        this.addTokens("TK_DECREMENTO");
                    } else if (letra === "=") {
                        this.auxLex += letra;
                        this.addTokens("TK_DESCONCATENAR");
                    } else {
                        this.addTokens("TK_MENOS");
                        index--;
                    }
                    break;
                case 15:
                    if (letra === "&") {
                        this.auxLex += letra;
                        this.addTokens("TK_AND");
                    } else {
                        console.log("ERROR" + this.auxLex);
                        this.state = 0;
                        this.auxLex = "";
                    }
                    break;
                case 16:
                    if (letra === "|") {
                        this.auxLex += letra;
                        this.addTokens("TK_OR");
                    } else {
                        console.log("ERROR" + this.auxLex);
                        this.state = 0;
                        this.auxLex = "";
                    }
                    break;
                case 17:
                    if (letra != "'") {
                        this.state = 17;
                        this.auxLex += letra;
                    } else {
                        this.auxLex += letra;
                        this.addTokens("TK_CARACTER");
                    }
                    break;
                default:
                    break;
            }

        }
    }

    addTokens(Type) {
        this.ListTokens.append(new Token(++this.idToken, this.auxLex, Type, this.column, this.row));
        this.auxLex = "";
        this.state = 0;
    }

    addErrors(Type) {
        this.ListErrors.append(new Errors(++this.idErrors, "LEXICO", "ERROR EN " + Type, this.column, this.row));
        this.auxLex = "";
        this.state = 0;
    }


}

module.exports = AnalizadorLexico;
/*const test = new AnalizadorLexico();
let cadena = `public interface calificacion_1 {
    public int metodo1(int a, int b, int c)
@
    public void metodo2(int d, int e, int w);
}`;
test.AnalisisLexico(cadena);
test.ListTokens.print();
test.ListErrors.print();
let sintacticoTest = new SyntacticAnalyzer(test.ListTokens, test.ListErrors);
console.log(sintacticoTest.traductor.text);
let graficar = new GraficasAST();
console.log(graficar.generateString(sintacticoTest.ast));*/