const Symbol = require('./Symbol');
const lista = require('./LinkedList');

let LinkedList = new lista();

class Map {
    constructor(name) {
        this.name = name
    }

    InsertSymbol(symbol) {
        LinkedList.append(symbol)
    }

    newValueOfSymbol(oldSymbol, newSymbol, rowSymbol, columnSymbol) {
        if (this.CheckSymbol(oldSymbol)) {
            this.SearchSymbol(oldSymbol).value = newSymbol;
        } else {
            LinkedList.append(new Symbol(oldSymbol, 'test', newSymbol, rowSymbol, columnSymbol));
        }
    }

    CheckSymbol(oldSymbol) {
        for (let index = 0; index < LinkedList.toArray().length; index++) {
            const element = LinkedList.toArray()[index];
            if (element.name === oldSymbol) {
                console.log(element);
                return true;
            }
        }
        return false;
    }

    SearchSymbol(symbol) {
        for (let index = 0; index < LinkedList.toArray().length; index++) {
            const element = LinkedList.toArray()[index];
            if (element.name === symbol) {
                return element
            }
        }
        return null
    }
}

module.exports = Map;