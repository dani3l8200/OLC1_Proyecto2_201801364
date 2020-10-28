class Token{
    constructor(idToken, type, lexem, row, column) {
        this.idToken = idToken;
        this.type = type;
        this.lexem = lexem;
        this.row = row;
        this.column = column;
    }

    getIdToken(){
        return this.idToken;
    }

    setIdToken(idToken){
        this.idToken = idToken;
    }

    getType(){
        return this.type;
    }

    setType(type){
        this.type = type;
    }

    getLexem(){
        return this.lexem;
    }

    setLexem(lexem){
        this.lexem = lexem;
    }

    getRow(){
        return this.row;
    }

    setRow(row){
        this.row = row;
    }

    getColumn(){
        return this.column;
    }

    setColumn(column){
        this.column = column;
    }

    toString(){
        return `id: ${this.getIdToken()} type: ${this.getType()} Lexema: ${this.getLexem()}  fila: ${this.getRow()} columna: ${this.getColumn()}`
    }
}

module.exports = Token;