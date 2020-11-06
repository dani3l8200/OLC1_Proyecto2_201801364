class Token {
    constructor(idToken, lexem, type, column, row) {
        this.idToken = idToken;
        this.lexem = lexem;
        this.type = type;
        this.column = column;
        this.row = row;
    }

    get getIDToken() {
        return this.idToken;
    }

    set setIDToken(idToken) {
        this.idToken = idToken;
    }

    get getLexema() {
        return this.lexem;
    }

    set setLexema(lexem) {
        this.lexem = lexem;
    }

    get getType() {
        return this.type;
    }

    set setType(type) {
        this.type = type;
    }

    get getColumn() {
        return this.column;
    }

    set setColumn(column) {
        this.column = column;
    }

    get getRow() {
        return this.row;
    }

    set setRow(row) {
        this.row = row;
    }

    toString() {
        return "ID: " + this.idToken + " Lexema: " + this.getLexema + "----Tipo: " + this.getType + "----Fila: " + this.getRow + "----Columna: " + this.getColumn;
    }
};

module.exports = Token;