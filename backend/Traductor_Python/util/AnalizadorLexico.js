const Token = require('../models/Token')
const LinkedList = require('../controllers/LinkedList');
const SyntacticAnalyzer = require('./SintacticoPY');
const GraficasAST = require('../controllers/GraficarAST');



class AnalizadorLexico {
    constructor() {
        this.state = 0;
        this.auxLex = "";
        this.column = 0;
        this.row = 1;
        this.ListTokens = new LinkedList();
        this.ListErrors = new LinkedList();
    }

    VerifyReserved() {
        switch (this.auxLex) {
            case "public":
                return "TK_PUBLIC";
            case "class":
                return "TK_CLASS";
            case "interface":
                return "TK_INTERFACE";
            case "void":
                return "TK_VOID";
            case "int":
                return "TK_INT";
            case "double":
                return "TK_DOUBLE";
            case "String":
                return "TK_STRING";
            case "char":
                return "TK_CHAR";
            case "for":
                return "TK_FOR";
            case "while":
                return "TK_WHILE";
            case "boolean":
                return "TK_BOOLEAN";
            case "false":
                return "TK_FALSE";
            case "true":
                return "TK_TRUE";
            case "do":
                return "TK_DO";
            case "if":
                return "TK_IF";
            case "else":
                return "TK_ELSE";
            case "continue":
                return "TK_CONTINUE";
            case "break":
                return "TK_BREAK";
            case "return":
                return "TK_RETURN";
            case "static":
                return "TK_STATIC";
            case "main":
                return "TK_MAIN";
            case "System":
                return "TK_SYSTEM";
            case "out":
                return "TK_OUT";
            case "println":
                return "TK_PRINTLN";
            case "print":
                return "TK_PRINT";
            default:
                return "TK_ID";
        }
    }

    AnalisisLexico(entra) {
        entra += "#"
        for (let index = 0; index < entra.length; index++) {
            let letra = entra[index];
            switch (this.state) {
                case 0:
                    if (letra === '\t' || letra === '\r' || letra === '\b' || letra === '\f' || letra === ' ') {
                        this.state = 0;
                    } else if (letra === '\n') {
                        this.row += 1;
                        this.state = 0;
                    } else if ((letra.charCodeAt(0) >= 65 && letra.charCodeAt(0) <= 90) || (letra.charCodeAt(0) >= 97 && letra.charCodeAt(0) <= 122)) {
                        this.state = 1;
                        this.auxLex += letra;
                        this.column += 1;
                    } else if ((letra.charCodeAt(0) >= 48 && letra.charCodeAt(0) <= 57)) {
                        this.state = 2;
                        this.auxLex += letra;
                        this.column += 1;
                    } else if (letra === '"') {
                        this.state = 4;
                        this.auxLex += letra;
                        this.column += 1;
                    } else if (letra === "{") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_LLAVEA");
                    } else if (letra === "}") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_LLAVEC");
                    } else if (letra === "/") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 5;
                    } else if (letra === "%") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_PORCENTAJE");
                    } else if (letra === "(") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_PARENTESISA");
                    } else if (letra === ")") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_PARENTESISC");
                    } else if (letra === ",") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_COMA");
                    } else if (letra === ".") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_PUNTO");
                    } else if (letra === ";") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_PUNTOCOMA");
                    } else if (letra === ">") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 9;
                    } else if (letra === "<") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 10;
                    } else if (letra === "=") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 11;
                    } else if (letra === "!") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 12;
                    } else if (letra === "+") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 13;
                    } else if (letra === "-") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 14;
                    } else if (letra === "&") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 15;
                    } else if (letra === "|") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.state = 16;
                    } else if (letra === "^") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_XOR");
                    } else if (letra === "*") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_PRODUCT")
                    } else if (letra === "]") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_CORC");
                    } else if (letra === "[") {
                        this.auxLex += letra;
                        this.column += 1;
                        this.addTokens("TK_CORA");
                    } else {
                        if (letra === "#" && index === (entra.length - 1)) {
                            console.log("se finalizo el analisis lexico");
                        } else {
                            this.auxLex += letra;
                            this.addErrors("CARACTER_DESCONOCIDO")
                        }
                    }
                    break;
                case 1:
                    if ((letra.charCodeAt(0) >= 65 && letra.charCodeAt(0) <= 90) || (letra.charCodeAt(0) >= 97 && letra.charCodeAt(0) <= 122)) {
                        this.auxLex += letra;
                        this.state = 1;
                    } else if ((letra.charCodeAt(0) >= 48 && letra.charCodeAt(0) <= 57)) {
                        this.auxLex += letra;
                        this.state = 1;
                    } else if (letra === "_") {
                        this.auxLex += letra;
                        this.state = 1;
                    } else {
                        const auxTipo = this.VerifyReserved();
                        this.addTokens(auxTipo);
                        index--;
                    }
                    break;
                case 2:
                    if ((letra.charCodeAt(0) >= 48 && letra.charCodeAt(0) <= 57)) {
                        this.auxLex += letra;
                        this.state = 2;
                    } else if (letra === '.') {
                        this.auxLex += letra;
                        this.state = 3;
                    } else {
                        this.addTokens("TK_NUMEROS");
                        index--;
                    }
                    break;
                case 3:
                    if ((letra.charCodeAt(0) >= 48 && letra.charCodeAt(0) <= 57)) {
                        this.auxLex += letra;
                        this.state = 3;
                    } else {
                        this.addTokens("TK_DECIMAL")
                        index--;
                    }
                    break;
                case 4:
                    if (letra != '"') {
                        this.auxLex += letra;
                        this.state = 4;
                    } else {
                        this.auxLex += letra;
                        this.addTokens("TK_CADENA");
                    }
                    break;
                case 5:
                    if (letra === "/") {
                        this.state = 6;
                        this.auxLex += letra;
                    } else if (letra === "*") {
                        this.state = 7;
                        this.auxLex += letra;
                    } else {
                        this.addTokens("TK_DIVISION");
                        index--;
                    }
                    break;
                case 6:
                    if (letra != "\n") {
                        this.auxLex += letra;
                        this.state = 6;
                    } else {
                        this.auxLex += letra;
                        this.addTokens("TK_COMENTARIO_UNILINEA");
                        index--;
                    }
                    break;
                case 7:
                    if (letra != "*") {
                        this.auxLex += letra;
                        this.state = 7;
                    } else {
                        this.auxLex += letra;
                        this.state = 8;
                    }
                    break;
                case 8:
                    if (letra != "/") {
                        this.state = 8;
                        this.auxLex += letra;
                    } else {
                        this.auxLex += letra;
                        this.addTokens("TK_COMENTARIO_MULTILINEA");
                    }
                    break;
                case 9:
                    if (letra === "=") {
                        this.auxLex += letra
                        this.addTokens("TK_MAYORIGUAL");
                    } else {
                        this.addTokens("TK_MAYOR");
                        index--;
                    }
                    break;
                case 10:
                    if (letra === "=") {
                        this.auxLex += letra;
                        this.addTokens("TK_MENORIGUAL");
                    } else {
                        this.addTokens("TK_MENOR");
                        index--;
                    }
                    break;
                case 11:
                    if (letra === "=") {
                        this.auxLex += letra;
                        this.addTokens("TK_COMPARACION")
                    } else {
                        this.addTokens("TK_IGUAL");
                        index--;
                    }
                    break;
                case 12:
                    if (letra === "=") {
                        this.auxLex += letra;
                        this.addTokens("TK_DISTINTO");
                    } else {
                        this.addTokens("TK_NOT");
                        index--;
                    }
                    break;
                case 13:
                    if (letra === "+") {
                        this.auxLex += letra;
                        this.addTokens("TK_INCREMENTO");
                    } else if (letra === "=") {
                        this.auxLex += letra;
                        this.addTokens("TK_CONCATENAR");
                    } else {
                        this.addTokens("TK_MAS");
                        index--;
                    }
                    break;
                case 14:
                    if (letra === "-") {
                        this.auxLex += letra;
                        this.addTokens("TK_DECREMENTO");
                    } else if (letra === "=") {
                        this.auxLex += letra;
                        this.addTokens("TK_DESCONCATENAR");
                    } else {
                        this.addTokens("TK_MENOS");
                        index--;
                    }
                    break;
                case 15:
                    if (letra === "&") {
                        this.auxLex += letra;
                        this.addTokens("TK_AND");
                    } else {
                        console.log("ERROR" + this.auxLex);
                        this.state = 0;
                        this.auxLex = "";
                    }
                    break;
                case 16:
                    if (letra === "|") {
                        this.auxLex += letra;
                        this.addTokens("TK_OR");
                    } else {
                        console.log("ERROR" + this.auxLex);
                        this.state = 0;
                        this.auxLex = "";
                    }
                    break;
                default:
                    break;
            }

        }
    }

    addTokens(Type) {
        this.ListTokens.append(new Token(this.auxLex, Type, this.column, this.row));
        this.auxLex = "";
        this.state = 0;
    }

    addErrors(Type) {
        this.ListErrors.append(new Token(this.auxLex, Type, this.column, this.row));
        this.auxLex = "";
        this.state = 0;
    }


}

module.exports = AnalizadorLexico;
const test = new AnalizadorLexico();
let cadena = `public class calificacion_1 {
    public int fibonacci(int n) {
      if ( n > 1 ){
        return fibonacci( n - 1 ) + fibonacci( n - 2 );  //función recursiva
      }
      else if ( n == 1 ) {  // caso base
        return 1;
      }
      else if ( n == 0 ){  // caso base
        return 0;
      }
      else{ //error 
        System.out.print((2%5));
        return -1;
      }
    }

    public int factorial_forma_1(int numero){
        int factorial = 0;
        while ( numero != 0 ) {
          factorial = factorial * numero;
          numero = numero - 1;
        }
        return factorial;
      }

      public int factorial_forma_2(double numero){
        if ( numero == 0  && numero != 0) {
          return 1;
        }
        else{
          return numero * factorial_forma_2( numero - 1 );
        }
      }

      public int factorial_forma_2(double numero){
        if ( numero == 0 ) {
          return 1;
        }
        else{
          return numero * factorial_forma_2( numero - 1 );
        }
      }

      public int ackerman(int m, int n) {
        if (n < 0 || m < 0) {
          return -1; // parametros no validos \n
        }
        if (m == 0) {
          return n + 1;
        }
        if (n == 0) {
          return ackerman(m - 1, 1);
        }
        return ackerman(m - 1, ackerman(m, n - 1));
      }

      public void Hanoi(int n, int origen,  int auxiliar, int destino){
        if(n==1){
          System.out.println("mover disco de " + origen + " a " + destino);
        }else{
          Hanoi(n-1, origen, destino, auxiliar);
          System.out.println("mover disco de "+ origen + " a " + destino);
          Hanoi(n-1, auxiliar, origen, destino);
        }
      }

      public void main_1(String args) {
        int a = 20;
        int b = 10;
        int c = 0;
        int d, e, f = 30;
        String x, y = "You";
        // Operador + y -
        System.out.println("a + b = " + (a + b) );
        System.out.println("a - b = " + (a - b) );
        // El operador + si se usa con strings
        // concatena las cadenas dadas.
        System.out.println("x + y = "+ x + y);
        
         // Operador * y /
         System.out.println("a * b = " + (a * b) );
         System.out.println("a / b = " + (a / b) );
         // operador de módulo da el resto
         // de dividir el primer operando con el segundo
         System.out.println("a % b = " + (a % b) );
         // si el denominador es 0 en la división
         // System.out.println(a/c);
         // lanzaría una java.lang.ArithmeticException
         int a1, b1, c1, d1, e1, f2, g = 9;
         // operador de asignación simple
         c = b;
         System.out.println("Valor de c = " + c);
         a = a + 1;
         b = b - 1;
         e = e * 2;
         f = f / 2;
         System.out.println(
           "Un texto concatenado es facil de "+
           "identificar pues este contendra uno o varios "+
           "simbolos (+) los cuales separan a los textos que "+
           "se encuentran entre comillas dobles () como el"+
           "ejemplo anterior."
         );
         a = a - 1;
         b = b + 1;
         e = e / 2;
         f = f * 2;
         return;
        
      }

      public double relacionales(){
        int arel, brel = 10;
        String xrel, yrel = "Thank";
        boolean condicion = true;
        //varios operadores condicionales
        System.out.println("a == b :" + (arel == brel));
        System.out.println("a < b :" + (arel < brel));
        System.out.println("a <= b :" + (arel <= brel));
        System.out.println("a > b :" + (arel > brel));
        System.out.println("a >= b :" + (arel >= brel));
        System.out.println("a != b :" + (arel != brel));
        System.out.println("condicion==true :" + (condicion == true));
        return (brel / 4);
      }

      public String a_prueba(){
        double /*-----comentario-------*/ xzy, asdf, pqrw = "string";
        /*
          int no_existe_1 = 0;
          string no_existe_2 = "texto de cadena"
          object obj = new Fantasma();
        */
      }
      /*
      Esta funcion valida la forma en la que una gramatica fue definida
      si el estudiante no define esta parte en la gramatica debera tirar error
      lo cual indica que falto esta validacion gramatical.
      */

     public boolean vacio(){}
     public boolean enciclar_ejecucion(int infinito){
       enciclar_ejecucion(infinito + 1);
       return true || false || true || true && false || (23 >= 32);
     }
     public void numeroPar(int numero) {
       System.out.println("Numero par menor que: " + numero);
       int n;
       do {
           n = (Random() * numero);
           System.out.println(n);
       } while (n / 2 != 0);
       System.out.println("Y el numero par elegido es: " + n);
   }
   public String concatenacion(String cad){
       for(int integer = 0; integer >= 1000; i++) {
         cad = cad + "<tr> <td> "+ integer +"</td> </tr>";
       }
       return cad;
     }
     public void main12(){
       String cadena_principal = "El texto html debera concatenarse";
       cadena_principal = concatena(cadena_principal);
     }
     
}`;
test.AnalisisLexico(cadena);
test.ListTokens.print();
test.ListErrors.print();
let sintacticoTest = new SyntacticAnalyzer(test.ListTokens);
console.log(sintacticoTest.traductor.text);
let graficar = new GraficasAST();
console.log(graficar.generateString(sintacticoTest.ast));