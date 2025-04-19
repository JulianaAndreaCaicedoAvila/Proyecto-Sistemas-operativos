package Back;
import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        //Se importa el escaner para poder ingresar datos desde la consola
        Scanner sc = new Scanner(System.in);

        //Se crean las dos listas para poder manejar los movimientos
        List<Ingreso> ingresos = new ArrayList<>();
        List<Egreso> egresos = new ArrayList<>();

        //para saber el numero de espacio en las listas se pregunta el numero de movientos 
        System.out.print("¿Cuántos ingresos deseas ingresar? ");
        int numIngresos = sc.nextInt();
        sc.nextLine(); // limpiar buffer

        //Se recorre la lista y se van ingresando los datos
        for (int i = 0; i < numIngresos; i++) {
            //Dice el numero de ingresos que hay en la lista
            System.out.println("Ingreso número:" + (i + 1));
            //Pide una descripción del ingreso 
            System.out.print("Descripción: ");
            String desc = sc.nextLine();
            //Pide el valor del ingreso
            System.out.print("Valor: ");
            double valor = sc.nextDouble();
            sc.nextLine();
            //Guarda el ingreso en un espacio de la lista
            ingresos.add(new Ingreso(valor, desc));
        }
        //Se recorre la lista y se van ingresando los datos
        System.out.print("\n¿Cuántos egresos deseas ingresar? ");
        int numEgresos = sc.nextInt();
        sc.nextLine(); // limpiar buffer

        for (int i = 0; i < numEgresos; i++) {
            //Dice el numero de ingresos que hay en la lista
            System.out.println("Egreso número:" + (i + 1));
            //Pide una descripción del ingreso
            System.out.print("Descripción: ");
            String desc = sc.nextLine();
             //Pide el valor del ingreso
            System.out.print("Valor: ");
            double valor = sc.nextDouble();
            sc.nextLine();
             //Guarda el egreso en un espacio de la lista
            egresos.add(new Egreso(valor, desc));
        }

 /*En este espacio se realiza la parelización del código
  */
  //Se crean dos objetos,los cuales implementan la interfaz Runnable: Cada uno recibe una lista de valores (ingresos o egresos) para ser procesada
        CalculadorIngresos calcIngresos = new CalculadorIngresos(ingresos);
        CalculadorEgresos calcEgresos = new CalculadorEgresos(egresos);
//Se crean los hilos: Cada hilo ejecutará su método run() en paralelo
        Thread hiloIngresos = new Thread(calcIngresos);
        Thread hiloEgresos = new Thread(calcEgresos);
//Se inician los hilos con start() lo que permite que ambos cálculos se ejecuten al mismo tiempo
        hiloIngresos.start();
        hiloEgresos.start();
//Se utilizan join() para que el programa principal espere a que ambos hilos terminen su ejecución 
        hiloIngresos.join();
        hiloEgresos.join();
//Son variables para alojar el resultado de las listas y mostrarlo
        double totalIngresos = calcIngresos.getTotal();
        double totalEgresos = calcEgresos.getTotal();
//Se calcula el total global (ingresos - egresos).
        double totalGlobal = totalIngresos - totalEgresos;
//Es para que el usuario vea el resultado del programa
        System.out.println("\n********** RESULTADOS **********");
        System.out.println("Total Ingresos: $" + totalIngresos);
        System.out.println("Total Egresos:  $" + totalEgresos);
        System.out.println("Saldo Final:    $" + totalGlobal);
    }
}
