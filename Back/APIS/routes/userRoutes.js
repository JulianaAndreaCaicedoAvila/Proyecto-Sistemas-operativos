const express = require('express'); 
// Importa el módulo `express` para crear el enrutador

const router = express.Router(); 
// Crea una nueva instancia de enrutador de Express

const { 
  crearUsuario, 
  obtenerUsuarios, 
  obtenerobtenerUsuariosId, 
  actualizarUsuario, 
  eliminarUsuario, 
  iniciarSesion 
} = require('../controllers/userController'); 
// Importa las funciones del controlador de usuarios para usarlas en las rutas

router.get('/usuariosALL', obtenerUsuarios); 
// Define una ruta GET para obtener todos los usuarios (controlada por `obtenerUsuarios`)

router.get('/usuarios/:id', obtenerobtenerUsuariosId); 
// Define una ruta GET para obtener un usuario específico por su ID (controlada por `obtenerobtenerUsuariosId`)

router.post('/usuarios', crearUsuario); 
// Define una ruta POST para crear un nuevo usuario (controlada por `crearUsuario`)

router.put('/usuarios/:id', actualizarUsuario); 
// Define una ruta PUT para actualizar un usuario específico por su ID (controlada por `actualizarUsuario`)

router.delete('/usuarios/:id', eliminarUsuario); 
// Define una ruta DELETE para eliminar un usuario específico por su ID (controlada por `eliminarUsuario`)

router.post('/login', iniciarSesion); 
// Define una ruta POST para manejar el inicio de sesión (controlada por `iniciarSesion`)

module.exports = router; 
// Exporta el enrutador para que pueda ser usado en el servidor principal
