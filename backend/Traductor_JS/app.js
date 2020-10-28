const parser = require('./Gramatica');
const listaTest = require('./Gramatica').listTokens;
var auxNodo = require('./Gramatica').auxNodo
const GraficasASTJS = require('./GraficasASTJS');
let txt = `//Tes Comentaio normal
public class intento{
   public String metodo1(){
       
   }
}
public interface intento2{
    public void metodo2();
    public String metodo3();
}
`
auxNodo = parser.parse(txt)

listaTest.print();
let graficadora = new GraficasASTJS();
console.log(graficadora.generateString(auxNodo));

/* */   