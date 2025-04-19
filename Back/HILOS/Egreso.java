package Back.HILOS;
/*
 * Es un tipo de movimiento, esta clase extiende el formato de la clase Moviento
 * Representa los valores que se van a restar del capital de la empresa o persona
 */

public class Egreso extends Movimiento {
    public Egreso(double valor, String descripcion) {
        super(valor, descripcion);
    }
}
