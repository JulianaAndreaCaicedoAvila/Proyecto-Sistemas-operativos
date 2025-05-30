const express = require('express'); 
// Importa el módulo `express` para configurar el servidor

const sequelize = require('./config/database');
// Importa la configuración de la base de datos


const cors = require('cors'); 
// Importa el middleware CORS para gestionar solicitudes entre orígenes diferentes

const userRoutes = require('./routes/userRoutes'); 



const app = express(); 
// Crea una instancia de la aplicación Express

app.use(cors()); 
// Activa el middleware CORS para permitir solicitudes de diferentes dominios

app.use(express.json()); 
// Activa el middleware para parsear datos en formato JSON

const PORT = 3000; 
// Define el puerto donde correrá el servidor

// Rutas de la API



app.use('/api/usuarios', userRoutes); 
// Conecta las rutas para los usuarios


const finanzasRoutes = require('./routes/finanzasRoutes');
app.use('/api', finanzasRoutes);


sequelize.sync({ alter: true }) 
// Sincroniza los modelos con la base de datos, actualizando las tablas si es necesario
    .then(() => { 
        // Promesa para manejar una sincronización exitosa
        console.log('Tablas sincronizadas con la base de datos MySQL :3'); 
        // Mensaje al sincronizar correctamente
        app.listen(PORT, () => { 
            // Inicia el servidor en el puerto definido
            console.log(`:p Servidor corriendo en el puerto ${PORT}`); 
            // Mensaje de que el servidor está activo
        });
    })
    .catch(err => { 
        // Maneja errores durante la sincronización o inicio del servidor
        console.error('Error al sincronizar las tablas o al iniciar el servidor:', err); 
        // Muestra el error en la consola
    });

app.get('/api/usuarios/usuarios/:usuario', async (req, res) => { 
    // Ruta GET para obtener un usuario específico por ID
    const { usuario } = req.params; 
    // Obtiene el parámetro `usuario` de la URL
    try { 
        // Bloque para manejar operaciones exitosas
        const result = await pool.query('SELECT * FROM usuarios WHERE ID_usuario = ?', [usuario]); 
        // Consulta en la base de datos buscando por el ID del usuario
        if (result.length > 0) { 
            // Si se encuentran resultados
            res.json(result); 
            // Devuelve los datos del usuario
        } else { 
            // Si no se encuentra el usuario
            res.status(404).json({ message: 'Usuario no encontrado' }); 
            // Devuelve un error 404
        }
    } catch (error) { 
        // Bloque para manejar errores
        console.error('Error en la consulta:', error); 
        // Muestra el error en la consola
        res.status(500).json({ message: 'Error del servidor' }); 
        // Devuelve un error 500
    }
});

app.post('/api/usuarios/login', (req, res) => { 
    // Ruta POST para manejar el inicio de sesión
    const { usuario, password } = req.body; 
    // Obtiene el usuario y contraseña del cuerpo de la solicitud
    if (usuario === 'jancaicedo' && password === '123') { 
        // Comprueba si las credenciales son correctas
        return res.json({ message: 'Inicio de sesión exitoso' }); 
        // Devuelve un mensaje de éxito si coinciden
    } else { 
        // Si las credenciales no coinciden
        return res.status(401).json({ error: 'Credenciales incorrectas' }); 
        // Devuelve un error 401 de autenticación fallida
    }
});
