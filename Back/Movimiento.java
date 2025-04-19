package Back;

/*Se crea una clase abtrata para manejar el tipo de 
 * movimiento que se vaya a realizar: puede ser "ingreso" o "egreso"
 * Tiene las atributos de "Descripción" y "Valor"
 */
public abstract class Movimiento {
    protected double valor;
    protected String descripcion;
/*
 * Es el metodo constrictor
 */
    public Movimiento(double valor, String descripcion) {
        this.valor = valor;
        this.descripcion = descripcion;
    }
/*
 *Los getters son para poder visualizar la info desde otra clase 
 */
    public double getValor() {
        return valor;
    }
    public String getDescripcion() {
        return descripcion;
    }
}
