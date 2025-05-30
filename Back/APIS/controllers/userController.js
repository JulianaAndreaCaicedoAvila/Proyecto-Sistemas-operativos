const User = require('../models/userModel'); 
// Importa el modelo de usuarios desde el archivo correspondiente para interactuar con la base de datos

// Patron de diseño Controller
// Centraliza la lógica de enrutamiento y el control de solicitudes
// En este caso, es el CRUD de cada tabla por medio de métodos

const crearUsuario = async (req, res) => { 
  // Define una función asincrónica para crear un usuario
  try { 
    // Intenta ejecutar el bloque de código dentro del try
    const nuevoUsuario = await User.create(req.body); 
    // Crea un nuevo usuario en la base de datos usando los datos recibidos en el cuerpo de la solicitud
    res.status(201).json(nuevoUsuario); 
    // Responde con un código HTTP 201 (creado) y devuelve el usuario recién creado en formato JSON
  } catch (err) { 
    // Captura cualquier error que ocurra dentro del try
    res.status(400).json({ error: err.message }); 
    // Responde con un código HTTP 400 (solicitud incorrecta) y un mensaje de error
  }
};

const obtenerUsuarios = async (req, res) => { 
  // Define una función asincrónica para obtener todos los usuarios
  try { 
    // Intenta ejecutar el bloque de código dentro del try
    const usuarios = await User.findAll(); 
    // Busca todos los usuarios en la base de datos
    res.status(200).json(usuarios); 
    // Responde con un código HTTP 200 (éxito) y devuelve los usuarios en formato JSON
  } catch (err) { 
    // Captura cualquier error que ocurra dentro del try
    res.status(500).json({ error: err.message }); 
    // Responde con un código HTTP 500 (error interno del servidor) y un mensaje de error
  }
};

const obtenerobtenerUsuariosId = async (req, res) => { 
  // Define una función asincrónica para obtener un usuario por su ID
  try { 
    // Intenta ejecutar el bloque de código dentro del try
    const usuarios = await User.findByPk(req.params.id); 
    // Busca un usuario en la base de datos por su clave primaria (ID)
    if (usuarios) { 
      // Verifica si el usuario existe
      res.status(200).json(usuarios); 
      // Responde con un código HTTP 200 (éxito) y el usuario encontrado en formato JSON
    } else { 
      // Si el usuario no existe
      res.status(404).json({ error: 'usuario no encontrado' }); 
      // Responde con un código HTTP 404 (no encontrado) y un mensaje de error
    }
  } catch (err) { 
    // Captura cualquier error que ocurra dentro del try
    res.status(500).json({ error: err.message }); 
    // Responde con un código HTTP 500 (error interno del servidor) y un mensaje de error
  }
};

const actualizarUsuario = async (req, res) => { 
  // Define una función asincrónica para actualizar un usuario
  try { 
    // Intenta ejecutar el bloque de código dentro del try
    const usuarioActualizado = await User.update(req.body, { 
      // Actualiza los datos de un usuario en la base de datos usando los datos del cuerpo de la solicitud
      where: { ID_usuario: req.params.id } 
      // Especifica que la actualización se debe hacer en el usuario cuyo ID coincide con el proporcionado en los parámetros de la solicitud
    });
    res.status(200).json(usuarioActualizado); 
    // Responde con un código HTTP 200 (éxito) y devuelve el usuario actualizado en formato JSON
  } catch (err) { 
    // Captura cualquier error que ocurra dentro del try
    res.status(400).json({ error: err.message }); 
    // Responde con un código HTTP 400 (solicitud incorrecta) y un mensaje de error
  }
};

const eliminarUsuario = async (req, res) => { 
  // Define una función asincrónica para eliminar un usuario
  try { 
    // Intenta ejecutar el bloque de código dentro del try
    await User.destroy({ where: { ID_usuario: req.params.id } }); 
    // Elimina un usuario en la base de datos cuyo ID coincide con el proporcionado en los parámetros de la solicitud
    res.status(200).json({ message: 'Usuario eliminado' }); 
    // Responde con un código HTTP 200 (éxito) y un mensaje indicando que el usuario fue eliminado
  } catch (err) { 
    // Captura cualquier error que ocurra dentro del try
    res.status(500).json({ error: err.message }); 
    // Responde con un código HTTP 500 (error interno del servidor) y un mensaje de error
  }
};

// Función para iniciar sesión
const iniciarSesion = async (req, res) => { 
  // Define una función asincrónica para manejar el inicio de sesión
  const { usuario, password } = req.body; 
  // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud

  try { 
    // Intenta ejecutar el bloque de código dentro del try
    const usuarioEncontrado = await User.findOne({ where: { ID_usuario: usuario } }); 
    // Busca un usuario en la base de datos cuyo ID coincida con el proporcionado

    if (!usuarioEncontrado) { 
      // Verifica si el usuario existe
      return res.status(404).json({ error: 'Usuario no encontrado' }); 
      // Si no existe, responde con un código HTTP 404 (no encontrado) y un mensaje de error
    }

    if (usuarioEncontrado.password !== password) { 
      // Compara la contraseña proporcionada con la almacenada (sin encriptación)
      return res.status(401).json({ error: 'Contraseña incorrecta' }); 
      // Si no coinciden, responde con un código HTTP 401 (no autorizado) y un mensaje de error
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso' }); 
    // Si la autenticación es exitosa, responde con un código HTTP 200 (éxito) y un mensaje de confirmación

  } catch (err) { 
    // Captura cualquier error que ocurra dentro del try
    res.status(500).json({ error: err.message }); 
    // Responde con un código HTTP 500 (error interno del servidor) y un mensaje de error
  }
};

module.exports = { 
  // Exporta las funciones definidas para que puedan ser usadas en otras partes de la aplicación
  crearUsuario,
  obtenerUsuarios,
  obtenerobtenerUsuariosId,
  actualizarUsuario,
  eliminarUsuario, 
  iniciarSesion
};
