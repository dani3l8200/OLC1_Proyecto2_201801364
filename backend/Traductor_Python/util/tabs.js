const Map = require('../data_structure/Map');

class Tabs {
    constructor(id, name, text) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.translateText = "";
        this.map = new Map(name);
    }
}

const tabs = new Tabs("x", "var", 'dsjaidsajodsa');
console.log(tabs.id);