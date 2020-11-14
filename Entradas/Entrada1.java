/********************************************************
*********************************************************
*********************COMPILADORES 1**********************
*********************************************************
********************SEGUNDO SEMESTRE*********************
*********************************************************
**************************2020***************************
*********************************************************
*******************ENTRADA DE PRUEBA*********************
*********************************************************
***********************PROYECTO 2************************
*********************************************************
********************************************************/

public interface interfaz {
    public void hello(String h);
    public void world(String a, int b, char c, double d, boolean e, int f, char g, double h, boolean i
    , int j, char k, int l); 
} 

public interface interfaz_Vacia {}


public class prueba_1 {
    char global = 'a';

    public int fibonacci(int n) {
        if (n > 1){
            return fibonacci+(n-1) + fibonacci-(n-2);  //función recursiva

        } else if (n == 1 || n == 0) {  // caso base
            return 1;

        } else { //error
            System.out.println("Debes ingresar un tamaño mayor o igual a 1, ingresaste: " + n);
            return -1;             
        }
        hello(global, 'b');
    }

    public int Ack(int m, int n){
        if (m == 0) {
            return n + 1;

        } else if (n == 0) {
            return Ack(m - 1, 1);

        } else {
            return Ack-(m - 1 * Ack/(m++, n - 1))* holaMundo;
        }
    }


    public static void main(String[] args) {
        int num = 32465;

        System.out.print("El factorial de " + num + " es: " + factorial*(num--));

    }
     
    public int factorial(int num){
        if(num == 0){
            return 1;
        } else {
            return num * factorial*                 num-1;
        }
    }


    public String helo(String h){
        return "Bienvenido a Compiladores 1 " + h;
    }

}

public interface Modificacion {
    public int incremento(int a);
    public int decremento(int a);
}

public class clase {

    public int incremento(int a){
        return a++;
    }

    public int decremento(int a){
        return a--;
    }


    public static void main(String [      ]args) {
        //uso del ciclo for

        for(int x=0;x<100;x++){
            for(double y=0.0;y<100;y++){
                System.out.print("Pares de numeros: "+ x + " ," + y );
                System.out.println("");
            }
        }
        int w = 100;
        decremento(w);
        incremento(w+5);
        decremento(w*10);
        incremento(w/15);
        decremento(w-20);
        
    }

}


°
public class error {

    /*
    * Recuperacion mediante
    * modo panico
    */

    void recuperarse(){
        double x = 5-3*2-4;
        String s = "Texto cadena";
        char y = '3'
        int x = 8;
        boolean True = true && false ! true || true !!!! false && true;
    }
    ¬

    void declaraciones(){
        String s = "",t,r,i="Compi",n="1",g="2020";
        int pi = 3.14159265358979323846;
    }

    public static void main(String args[    ])
    {
        int x = 1;
 
        // Salir cuando x llega a ser mayor que 4
        while (x <= 4)
        {   ~
            System.out.println("Valor de x: " + x);
 
            //incrementa el valor de x para la siguiente iteración
            x++;
        }


        do {   System.out.print ("Contando... " + (contador + 1) );

            contador = contador++ 1;

        } while (contador < 10); 
    }

}
@
//Errores Lexicos: 113, 128, 141, 157