class Error {
    constructor(id, type, description, column, row) {
        this.id = id;
        this.description = description;
        this.type = type;
        this.column = column;
        this.row = row;
    }

    get getId() {
        return this.id;
    }

    set setId(id) {
        this.id = id;
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

    get getDescription() {
        return this.description
    }

    set setDescription(description) {
        this.description = description;
    }

    toString() {
        return "Tipo: " + this.getType + "----ID: " + this.getId + "----Description: " + this.getDescription + "----Fila: " + this.getRow + "----Columna: " + this.getColumn;
    }
};

module.exports = Error;