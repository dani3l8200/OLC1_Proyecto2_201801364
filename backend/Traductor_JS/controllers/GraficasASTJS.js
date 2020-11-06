const StringBuilder = require('string-builder');
class GraficasASTJS {
    constructor() {
        this.counter = 0;
        this.cadena = new StringBuilder();
    }

    generateString(raiz) {
        this.cadena.append("digraph D{\n\t node[shape=ellipse fillcolor=yellow1 style=filled];\n\t\t");
        this.cadena.append("graph[bgcolor = grey77, label=\"AST JavaScript\"];\n\t")
        this.getNodos(raiz, this.cadena);
        this.setRelation(raiz, this.cadena);
        this.cadena += "}";
        return this.cadena;
    }

    getNodos(raiz, cadena) {
        cadena.append("node").append(this.counter.toString()).append(" [label =\"").append(raiz.getValue).append("\"];\n\t\t");
        raiz.id = this.counter;
        this.counter++;
        for (const child of raiz.getChildrens.toArray()) {
            this.getNodos(child, cadena);
        }
    }

    setRelation(raiz, cadena) {
        for (const child of raiz.getChildrens.toArray()) {
            cadena.append('"node').append(raiz.getID.toString()).append('"->');
            cadena.append('"node').append(child.getID.toString()).append('";\n\t\t');
            this.setRelation(child, cadena);
        }
    }
}
module.exports = GraficasASTJS;