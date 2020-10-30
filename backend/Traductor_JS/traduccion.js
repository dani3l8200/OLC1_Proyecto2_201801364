class Traduccion{
    constructor() {
        this.text = "";
    }
    CommentUAndM(content, nTabs) {
        this.text += this.insertTabsInText(nTabs) + content + "\n";
    }

    ClassOrInterfaz(id, nTabs) {
        this.text += this.insertTabsInText(nTabs) + "class " + id + " {\n";
        this.text += this.insertTabsInText(nTabs+1) + "constructor(){}\n}"
    }

    insertTabsInText(n) {
        let text = "";
        for (let index = 0; index < n; index++) {
            text += "     "
        }
        return text
    }
}
module.exports = Traduccion;