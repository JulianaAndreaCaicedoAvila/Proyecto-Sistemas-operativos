package Back;
import java.util.List;
/*Es una clase para sumar la lista de ingresos que digite la persona
 * Implementa Runnable para poder manejar el paralelismo, es una interfaz funcional (es similar a Theread, pero es mas fácil de manejar)
 */
//Se crea una lista para manejar todos los ingresos que el usuario digite
//Se crea una variable para manejar el total de la lista de los ingresos por medio de un hilo
public class CalculadorIngresos implements Runnable {
    private List<Ingreso> ingresos;
    private double total = 0;

    public CalculadorIngresos(List<Ingreso> ingresos) {
        this.ingresos = ingresos;
    }

    /*
     * Es un metodo donde decimos las acciones que va a realizar el hilo
     */
    @Override
    public void run() {
        //Se recorre la lista
        for (Ingreso ingreso : ingresos) {
        //Suma todos los valores de la lista
            total += ingreso.getValor();
        //Para mirar si el hilo funciona y mirar lo que se ingreso
            System.out.println("Ingreso" + ingreso.getDescripcion() + " - $" + ingreso.getValor());
        }
    }
//Para visualizar el total
    public double getTotal() {
        return total;
    }
}
