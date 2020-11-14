/********************************************************
*********************************************************
*********************COMPILADORES 1**********************
*********************************************************
********************SEGUNDO SEMESTRE*********************
*********************************************************
**************************2020***************************
*********************************************************
************************ENTRADA 2************************
*********************************************************
***********************PROYECTO 2************************
*********************************************************
********************************************************/

public interface Instruccion {
    // Definición de funciones
    public void traducir(int x);
    public void getNodo(int val);
}


public class Persona {
    int numHijos = 0;
    boolean pareja = false;

    public void AgregarHijos(int hijos){
        // Bloque de instrucciones
        numHijos = numHijos + hijos;
        System.out.println(numHijos);
    }

    public void eliminarHijos(int hijos){
        // Bloque de instrucciones
        numHijos = numHijos - hijos;
        System.out.print(numHijos);
    }

    public void ModificarPareja(boolean bPareja){
        // Bloque de instrucciones
        pareja = bPareja;
        System.out.print(pareja);
    }

    public string ObtenerHijos(boolean none){
        // Bloque de instrucciones
        System.out.println("RETORNANDO NUMERO DE HIJOS");
        return numHijos;
    }

    public static void main(String[] args) {
        //Instrucciones
        System.out.println("MAIN CLASE PERSONA");
        System.out.println("------------------");
        System.out.println("AGREGAR HIJOS");
        AgregarHijos(6);
        System.out.println("------------------");
        System.out.println("ELIMINAR HIJOS");
        int HijosF = 2;
        eliminarHijos(2);
        System.out.println("------------------");
        System.out.println("MODIFICAR PAREJA");
        boolean partner = false;
        partner = !((!!!!partner) || false && true);
        ModificarPareja(partner);
        System.out.println("------------------");
    }
}

public class Casa {
    // Todo tipo de variables globales y métodos o funciones
    int cuartos = 4; 
    String dueño = "Calificacion"; 

    public void setCuartos(int cuarto){
        // Bloque de instrucciones
        cuartos = cuartos + cuarto;
        System.out.println(cuartos);
    }

    public int getCuartos(int none){
        // Bloque de instrucciones
        System.out.print(cuartos);
        return cuartos;
    }

    public void setDueño(String pdueño){
        // Bloque de instrucciones
        dueño = pdueño;
        System.out.print(dueño);
    }

    public String getDueño(boolean none){
        // Bloque de instrucciones
        System.out.println("RETORNANDO AL DUEÑO");
        return dueño;
    }

    public static void main(String[] args) {
        //Instrucciones
        System.out.println("EJECUCION DE CASA :p");
    }
}

public class Carro {
    // Todo tipo de variables globales y métodos o funciones
    int puertas = 4; 
    int modelo = 2020;
    String marca = "Honda"; 
    String size = "Pequeño"; 

    public void setPuertas(int puerta){
        // Bloque de instrucciones
        puertas = puertas + puerta;
        System.out.println(puertas);
    }

    public int getPuertas(int none){
        // Bloque de instrucciones
        System.out.print("PUERTAS DEL CARRO: " + puertas);
        return puertas;
    }

    public void setModelo(int pmodelo){
        // Bloque de instrucciones
        modelo = pmodelo;
        System.out.print(modelo);
    }

    public int getModelo(boolean none){
        // Bloque de instrucciones
        System.out.println("RETORNANDO AL MODELO");
        return modelo;
    }

    public void setMarca(int pmarca){
        // Bloque de instrucciones
        marca = pmarca;
        System.out.print(marca);
    }

    public String getMarca(boolean none){
        // Bloque de instrucciones
        System.out.println("RETORNANDO LA MARCA");
        return marca;
    }

    public void setSize(int psize){
        // Bloque de instrucciones
        size = psize;
        System.out.print(size);
    }

    public String getSize(boolean none){
        // Bloque de instrucciones
        System.out.println("RETORNANDO EL SIZE");
        return size;
    }

    public static void main(String[] args) {
        //Instrucciones
        System.out.println("EJECUCION DE CARRO :p");
    }
}

    

public interface NodoAST {
    // Definición de funciones
    public void agregarNodo(String valor);
    public void eliminarNodo(int a);
    public void getNodo(int x);
}

public class Principal {

    public void insIf(int valor){
        // Bloque de instrucciones
        System.out.println("IF");
        if(valor > 100)
        {
            if(valor < 1000)
            {
                System.out.println("El valor " + valor + "es mayor a 100 y menor a 1000.");
            }
            else
            {
                System.out.println("El valor " + valor + "es mayor a 100 y mayor a 1000.");
            }
        }
        else if(valor > 0 && valor <= 100)
        {
            System.out.println("El valor " + valor + "es mayor a 0 y menor o igual a 100.");
        }
        else
        {
            System.out.println("El valor " + valor + "es menor a 100.");
        }
        System.out.println("------------------");
    }

    public void cicloFor(int valor){
        // Bloque de instrucciones
        System.out.println("FOR");
        int a = 100;
        double dec = 0.5;

        for( int x = 1; x <= a; x++){
            // Bloque de Instrucciones
            if(x == 10 || x == 20 || x == 30 || x == 40 || x == 50 || x == 60 || x == 70 || x == 80 || x == 90){
                continue;
            }
            System.out.println("CICLO FOR #" + x);
            dec = dec + x;
        }
        System.out.println("VARIABLE DEC" + dec);
        System.out.println("------------------");
    }

    public void cicloWhile(int valor){
        // Bloque de instrucciones
        System.out.println("WHILE");
        boolean prueba = true;

        while ( prueba ) {
            System.out.println("Esto lo verás una vez");
            prueba = false;
        }

        int x = 1;
        int y = 1;

        System.out.println("TABLAS DE MULTIPLICAR");

        while ( x <= 10 ) {

            while ( y <= 10 ) {

                System.out.println(x + " * " + y + " = " + (x * y));
                y++;
            }
            System.out.println("");
            x++;
        }

        System.out.println("------------------");
    }

    public void cicloDoWhile(int valor){
        // Bloque de instrucciones
        System.out.println("DO WHILE");
        boolean prueba = true;

        int x = 1;
        int y = 1;

        int contador = 0;

        do{
            if(contador == 86)
            {
                break;
            }
            System.out.println ("Contador" + (contador + 1) );
            contador ++;
        } while (contador<100);

        System.out.println ("Contador Final: " + (contador + 1) );

        System.out.println("------------------");
    }

    public static void main(String[] args) {
        //Instrucciones
        System.out.println("Principal");
        System.out.println("------------------");
        insIf(-50);
        insIf(45);
        insIf(5684);
        insIf(150);

        cicloFor(0);
        cicloWhile(0);
        cicloDoWhile(0);
    }
}