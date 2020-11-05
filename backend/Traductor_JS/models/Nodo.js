const LinkedList = require("../controllers/LinkedList");

class Nodo {
    constructor(Value) {
        this.id = 0;
        this.Value = Value;
        this.childrens = new LinkedList();
        this.traduccion = "";
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
    
    insertTabsInText(n) {
        let text = "";
        for (let index = 0; index < n; index++) {
            text += "    "
        }
        return text
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