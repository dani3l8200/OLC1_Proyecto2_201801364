const lista = require('./LinkedList');

let LinkedList = new lista();
class Translater {
    constructor() {
        this.text = ""
    }

    ClassOrInterfaz(id, nTabs) {
        this.text += this.insertTabsInText(nTabs) + "class " + id + ":\n"
    }

    DeclarationOrAssigVariable(name, value, nTabs, Type) {
        if (Type === "TK_CONCATENAR") {
            this.text += this.insertTabsInText(nTabs) + name + " += " + value + "\n";
        } else if (Type === "TK_DESCONCATENAR") {
            this.text += this.insertTabsInText(nTabs) + name + " -= " + value + "\n";
        } else if (Type === "TK_DECREMENTO") {
            this.text += this.insertTabsInText(nTabs) + name + " -= " + "1" + "\n";
        } else if (Type === "TK_INCREMENTO") {
            this.text += this.insertTabsInText(nTabs) + name + " += " + "1" + "\n";
        } else if (Type === "TK_IGUAL") {
            this.text += this.insertTabsInText(nTabs) + name + " = " + value + "\n";
        }

    }

    CommentUAndM(content, type, nTabs) {
        let newComment = '';
        if (type === "TK_COMENTARIO_UNILINEA") {
            for (let index = 2; index < content.length - 1; index++) {
                newComment += content[index];
            }
            this.text += this.insertTabsInText(nTabs) + "#" + newComment + "\n";
        } else if (type === "TK_COMENTARIO_MULTILINEA") {
            for (let index = 2; index < content.length - 2; index++) {
                newComment += content[index];
            }
            this.text += this.insertTabsInText(nTabs) + "''' \n" + newComment + "\n" + this.insertTabsInText(nTabs) + "'''\n";
        }
    }

    printWithContent(lista, nTabs, Type) {
        if (Type === "TK_PRINTLN") {
            this.text += this.insertTabsInText(nTabs) + "print(";

            for (let index = 0; index < lista.toArray().length; index++) {
                this.text += lista.toArray()[index];
            }
            this.text += ")\n";
        } else if (Type === "TK_PRINT") {
            this.text += this.insertTabsInText(nTabs) + "print(";

            for (let index = 0; index < lista.toArray().length; index++) {
                this.text += lista.toArray()[index];
            }
            this.text += ", end=\"\")\n";
        }

    }

    printWithoutContent(nTabs, Type) {
        if (Type === "TK_PRINT") {
            this.text += this.insertTabsInText(nTabs) + "print(end=\"\")\n";
        } else if (Type === "TK_PRINTLN") {
            this.text += this.insertTabsInText(nTabs) + "print()\n";
        }

    }

    IF(condition, nTabs) {
        this.text += this.insertTabsInText(nTabs) + condition + " :\n";
    }

    BeginMain(nTabs) {
        this.text += this.insertTabsInText(nTabs) + "def main():\n";
    }

    endMain(nTabs) {
        this.text += this.insertTabsInText(nTabs) + 'if __name__ = "__main__":\n' + this.insertTabsInText(nTabs + 1) + "main()\n";
    }

    MFunc(name, params, nTabs) {
        this.text += "\n" + this.insertTabsInText(nTabs) + "def " + name + "(" + params + "):\n";
    }

    SFor(id, start, end, nTabs) {
        this.text += this.insertTabsInText(nTabs) + "for " + id + ' in range(' + start + ", " + end + "):\n";
    }

    SWhile(idlist, nTabs) {
        this.text += this.insertTabsInText(nTabs) + "while " + idlist + ":\n";
    }

    BeginDoWhile(nTabs) {
        this.text += this.insertTabsInText(nTabs) + "while True:\n";
    }

    EOFDoWhile(condition, nTabs) {
        this.text += this.insertTabsInText(nTabs) + "if (" + condition + "):\n" + this.insertTabsInText(nTabs + 1) + "break\n";
    }

    Return(idList, nTabs) {
        this.text += this.insertTabsInText(nTabs) + "return " + idList + "\n";
    }

    Break(nTabs) {
        this.text += this.insertTabsInText(nTabs) + "break\n";
    }

    Continue(nTabs) {
        this.text += this.insertTabsInText(nTabs) + "continue\n";
    }

    insertTabsInText(n) {
        let text = "";
        for (let index = 0; index < n; index++) {
            text += "     "
        }
        return text
    }

    UtilitationFuntion(content, nTabs) {
        this.text += this.insertTabsInText(nTabs) + "self." + content + "\n"
    }
}

module.exports = Translater;