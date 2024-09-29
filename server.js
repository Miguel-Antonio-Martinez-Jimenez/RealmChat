// ChatAPI/server.js
const express = require('express'); // Importa el framework de Express
const bodyParser = require('body-parser'); // Middleware para manejar los cuerpos de las solicitudes
const cors = require('cors'); // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
const dotenv = require('dotenv'); // Para manejar variables de entorno
const sequelize = require('./config/db.config'); // Importa la configuración de la base de datos

// Importar rutas
const authRoutes = require('./routes/auth.routes'); // Rutas de autenticación
const userRoutes = require('./routes/user.routes'); // Rutas de usuarios
const messageRoutes = require('./routes/message.routes'); // Rutas de mensajes
const groupRoutes = require('./routes/group.routes'); // Rutas de grupos
const notificationRoutes = require('./routes/notification.routes'); // Rutas de notificaciones
const contactRoutes = require('./routes/contact.routes'); // Rutas de notificaciones

// Configura dotenv para cargar variables de entorno
dotenv.config();
const app = express(); // Crea una instancia de Express

// Middleware
app.use(cors()); // Habilita CORS para todas las rutas
app.use(bodyParser.json()); // Parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parsear el cuerpo de las solicitudes URL-encoded

// Rutas
app.use('/auth', authRoutes); // Rutas de autenticación
app.use('/contact', contactRoutes); // Rutas de contactos
app.use('/user', userRoutes); // Rutas de usuarios
app.use('/message', messageRoutes); // Rutas de mensajes
app.use('/group', groupRoutes); // Rutas de grupos
app.use('/notification', notificationRoutes); // Rutas de notificaciones

// Sincronizar la base de datos y levantar el servidor
sequelize.sync() // Sincroniza el modelo con la base de datos
    .then(() => {
        console.log('Conexión con MySQL exitosa.'); // Mensaje de éxito de conexión
        console.log('Tablas sincronizadas...'); // Mensaje de sincronización de tablas
    })
    .catch((error) => {
        console.error('Error al sincronizar con MySQL: ', error); // Manejo de errores en la sincronización
    });

// Puerto
const PORT = process.env.PORT || 3010; // Define el puerto desde las variables de entorno o por defecto a 3005

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando en el puerto: ${PORT}`); // Mensaje al iniciar el servidor
});

module.exports = app; // Exporta la aplicación para uso en pruebas u otros módulos 