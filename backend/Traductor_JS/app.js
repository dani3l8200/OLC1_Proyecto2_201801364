const parser = require('./Gramatica');
const listaTest = require('./Gramatica').listTokens;
var auxNodo = require('./Gramatica').auxNodo
const GraficasASTJS = require('./GraficasASTJS');
var fs = require('fs');
var beautify = require('js-beautify').js;
let txt = `
/****************************************************************************************
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$Esto es un comentario multilinea y puede venir en cualquier parte del archivo de entrada$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*****************************************************************************************/


public class calificacion_1 {

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
      System.out.println("Debes ingresar un tamaño mayor o igual a 1");
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
    if ( numero == 0 ) {
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

    return args;
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



}

public class copia  /*extends calificacion implements calificacion_1*/ {



    public boolean metodo_copia1_(){
      String varc_1 = "Es una variable copia";
      int vare_1 = 1;
      double vard_1;
      boolean varb_1 = metodo_copia1_();
    }
  
  
    public String metodo_copia2_(int array, String array, double array, boolean array){
        return array + array + array + array;
      }
    
    
    
      public static void main(){
        //este metodo se considera copia aun siendo el metodo void main
          //ya que este pertenece a la misma clase y tiene el mismo nombre, mismo tipo de retorno,
          //misma cantidad de para metros y tipos de parametros.
        int calificacion_23_05_2020 = 1;
      }
  
  
  
  }
`
var filename = __dirname + "/output.js";
var test = parser.parse(txt)
auxNodo = test[0];  
let traduccion = test[1];
listaTest.print();
fs.writeFileSync(filename, traduccion, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Archivo Creado");
    }
})

let graficadora = new GraficasASTJS();
fs.writeFileSync("archivo.txt",graficadora.generateString(auxNodo), (err) =>{
    if(err){
        console.error(err);
    }
});


 




var traduccion2 = fs.readFileSync(filename).toString();
var formattedCode = beautify(traduccion2,{ indent_size: 4, space_in_empty_paren: true, "space_after_anon_function": true, "space_after_named_function": true,"brace_style": "collapse"});
fs.writeFileSync(filename,formattedCode, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Traduccion Creada");
    }
})

