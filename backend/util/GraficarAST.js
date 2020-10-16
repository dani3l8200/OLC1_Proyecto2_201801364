const StringBuilder = require('string-builder');
class GraficasAST {
    constructor() {
        this.counter = 0;
        this.cadena = new StringBuilder();
    }

    generateString(raiz) {
        this.cadena.append("digraph D{\n\t node[shape=circle fillcolor=green style=filled];\n\t\t");
        this.getNodos(raiz, this.cadena);
        this.setRelation(raiz, this.cadena);
        this.cadena += "}";
        return this.cadena;
    }

    getNodos(raiz, cadena) {
        cadena.append("node").append(this.counter.toString()).append(" [label =\"").append(raiz.getValue).append("\"];\n\t\t");
        raiz.setId(this.counter);
        this.counter++;
        for (const child of raiz.getChilds.toArray()) {
            this.getNodos(child, cadena);
        }
    }

    setRelation(raiz, cadena) {
        for (const child of raiz.getChilds.toArray()) {
            cadena.append('"node').append(raiz.getId.toString()).append('"->');
            cadena.append('"node').append(child.getId.toString()).append('";\n\t\t');
            this.setRelation(child, cadena);
        }
    }
}

module.exports = GraficasAST;