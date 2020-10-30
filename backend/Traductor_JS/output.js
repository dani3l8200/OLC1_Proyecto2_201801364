/****************************************************************************************
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$Esto es un comentario multilinea y puede venir en cualquier parte del archivo de entrada$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*****************************************************************************************/
//función recursiva
// caso base
// caso base
//error
// parametros no validos 
// Operador + y -
// El operador + si se usa con strings
// concatena las cadenas dadas.
// Operador * y /
// operador de módulo da el resto
// de dividir el primer operando con el segundo
// si el denominador es 0 en la división
// System.out.println(a/c);
// lanzaría una java.lang.ArithmeticException
// operador de asignación simple
//varios operadores condicionales
/*-----comentario-------*/
/*
      int no_existe_1 = 0;
      string no_existe_2 = "texto de cadena"

      object obj = new Fantasma();

    */
/*
  Esta funcion valida la forma en la que una gramatica fue definida
  si el estudiante no define esta parte en la gramatica debera tirar error
  lo cual indica que falto esta validacion gramatical.
  */
/*extends calificacion implements calificacion_1*/
//este metodo se considera copia aun siendo el metodo void main
//ya que este pertenece a la misma clase y tiene el mismo nombre, mismo tipo de retorno,
//misma cantidad de para metros y tipos de parametros.
class calificacion_1 {
    constructor() {}

    function fibonacci (n) {

        if (n > 1) {

            return fibonacci(n - 1) + fibonacci(n - 2);
        } else if (n == 1) {

            return 1;
        } else if (n == 0) {

            return 0;
        } else {

            console.log("Debes ingresar un tamaño mayor o igual a 1");
            return -1;
        }

    }

    function factorial_forma_1 (numero) {

        var factorial = 0;
        while (numero != 0) {

            factorial = factorial * numero;
            numero = numero - 1;
        }

        return factorial;
    }

    function factorial_forma_2 (numero) {

        if (numero == 0) {

            return 1;
        } else {

            return numero * factorial_forma_2(numero - 1);
        }

    }

    function factorial_forma_2 (numero) {

        if (numero == 0) {

            return 1;
        } else {

            return numero * factorial_forma_2(numero - 1);
        }

    }

    function ackerman (m, n) {

        if (n < 0 || m < 0) {

            return -1;
        }

        if (m == 0) {

            return n + 1;
        }

        if (n == 0) {

            return ackerman(m - 1, 1);
        }

        return ackerman(m - 1, ackerman(m, n - 1));
    }

    function Hanoi (n, origen, auxiliar, destino) {

        if (n == 1) {

            console.log("mover disco de " + origen + " a " + destino);
        } else {

            Hanoi(n - 1, origen, destino, auxiliar);
            console.log("mover disco de " + origen + " a " + destino);
            Hanoi(n - 1, auxiliar, origen, destino);
        }

    }

    function main_1 (args) {

        var a = 20;
        var b = 10;
        var c = 0;
        var d, e, f = 30;
        var x, y = "You";
        console.log("a + b = " + (a + b));
        console.log("a - b = " + (a - b));
        console.log("x + y = " + x + y);
        console.log("a * b = " + (a * b));
        console.log("a / b = " + (a / b));
        console.log("a % b = " + (a % b));
        var a1, b1, c1, d1, e1, f2, g = 9;
        c = b;
        console.log("Valor de c = " + c);
        a = a + 1;
        b = b - 1;
        e = e * 2;
        f = f / 2;
        console.log("Un texto concatenado es facil de " + "identificar pues este contendra uno o varios " + "simbolos (+) los cuales separan a los textos que " + "se encuentran entre comillas dobles () como el" + "ejemplo anterior.");
        a = a - 1;
        b = b + 1;
        e = e / 2;
        f = f * 2;
        return args;
    }

    function relacionales () {

        var arel, brel = 10;
        var xrel, yrel = "Thank";
        var condicion = true;
        console.log("a == b :" + (arel == brel));
        console.log("a < b :" + (arel < brel));
        console.log("a <= b :" + (arel <= brel));
        console.log("a > b :" + (arel > brel));
        console.log("a >= b :" + (arel >= brel));
        console.log("a != b :" + (arel != brel));
        console.log("condicion==true :" + (condicion == true));
        return (brel / 4);
    }

    function a_prueba () {

        var xzy, asdf, pqrw = "string";
    }

    function vacio () {

    }

    function enciclar_ejecucion (infinito) {

        enciclar_ejecucion(infinito + 1);
        return true || false || true || true && false || (23 >= 32);
    }

    function numeroPar (numero) {

        console.log("Numero par menor que: " + numero);
        var n;
        do {

            n = (Random() * numero);
            console.log(n);
        }

        while (n / 2 != 0);
        console.log("Y el numero par elegido es: " + n);
    }

    function concatenacion (cad) {

        for (var integer = 0; integer >= 1000; i++) {

            cad = cad + "<tr> <td> " + integer + "</td> </tr>";
        }

        return cad;
    }

    function main12 () {

        var cadena_principal = "El texto html debera concatenarse";
        cadena_principal = concatena(cadena_principal);
    }


}
class copia {
    constructor() {}

    function metodo_copia1_ () {

        var varc_1 = "Es una variable copia";
        var vare_1 = 1;
        var vard_1;
        var varb_1 = metodo_copia1_();
    }

    function metodo_copia2_ (array, array, array, array) {

        return array + array + array + array;
    }

    {

        var calificacion_23_05_2020 = 1;
    }


}