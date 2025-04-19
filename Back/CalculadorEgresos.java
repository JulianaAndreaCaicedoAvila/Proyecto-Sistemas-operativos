package Back;
import java.util.List;
/*Es una clase para sumar la lista de egresos que digite la persona
 * Implementa Runnable para poder manejar el paralelismo, es una interfaz funcional (es similar a Theread, pero es mas fácil de manejar)
 */
//Se crea una lista para manejar todos los egresos que el usuario digite
//Se crea una variable para manejar el total de la lista de los egresos por medio de un hilo

public class CalculadorEgresos implements Runnable {
    private List<Egreso> egresos;
    private double total = 0;

    public CalculadorEgresos(List<Egreso> egresos) {
        this.egresos = egresos;
    }
  /*
     * Es un metodo donde decimos las acciones que va a realizar el hilo
     */
    @Override
    public void run() {
         //Se recorre la lista
        for (Egreso egreso : egresos) {
             //Suma todos los valores de la lista
            total += egreso.getValor();
            //Para mirar si el hilo funciona y mirar lo que se ingreso
            System.out.println("Egreso: " + egreso.getDescripcion() + " - $" + egreso.getValor());
        }
    }
//Para visualizar el total
    public double getTotal() {
        return total;
    }
}
