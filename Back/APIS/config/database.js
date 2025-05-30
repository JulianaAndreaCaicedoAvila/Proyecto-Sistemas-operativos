const { Sequelize } = require('sequelize');
// Aca se puede ver el patron de diseño Siglenton ya que crea una instancia de la conexion de la 
//base de datos, esta intancia se crea una unica vez, en este caso es sequelize
// Crear una conexión con la base de datos MySQL se tomo de Mamp mysql server/ apache server
const sequelize = new Sequelize('SO', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306 
});
//Es para saber por consola si esta conectada
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa :)');
  })
  .catch((err) => {
    console.error('Error al conectar :(   :', err);
  });

module.exports = sequelize;
