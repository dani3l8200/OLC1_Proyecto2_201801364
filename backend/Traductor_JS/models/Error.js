class Error {
    constructor(idError, type, row, column, description) {
        this.idError = idError;
        this.type = type;
        this.row = row;
        this.column = column;
        this.description = description;
    }   

    getIdError(){
        return this.idError;
    }

    setIdError(idError){
        this.idError = idError;
    }

    getType(){
        return this.type;
    }

    setType(type){
        this.type = type;
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

    getDescription(){
        return this.description;
    }

    setDescription(description){
        this.description = description;
    }
}

module.exports = Error;