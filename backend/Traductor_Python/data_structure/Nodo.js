const LinkedList = require("./LinkedList");


class Nodo {
    constructor(value) {
        this.value = value;
        this.childs = new LinkedList();
        this.id = 0;
    }

    get getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }
    get getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    get getChilds() {
        return this.childs;
    }

    hasChilds() {
        if (this.childs.toArray().length != 0) {
            return true
        }
        return false
    }

    addChilds(childs) {
        this.childs.append(childs)
    }

}
module.exports = Nodo;