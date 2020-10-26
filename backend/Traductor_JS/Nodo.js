const LinkedList = require("./LinkedList");

class Nodo {
    constructor(Type, Value) {
        this.id = 0;
        this.Value = Value;
        this.Type = Type;
        this.childrens = new LinkedList();
    }

    get getID() {
        return this.id;
    }

    get getValue() {
        return this.Value;
    }

    get getType() {
        return this.Type;
    }

    get getChildrens() {
        return this.childrens;
    }

    setID(ID) {
        this.id = ID;
    }

    setValue(Value) {
        this.Value = Value;
    }

    setType(Type) {
        this.Type = Type;
    }

    addChildrens(children) {
        this.childrens.append(children)
    }

}

module.exports = Nodo;