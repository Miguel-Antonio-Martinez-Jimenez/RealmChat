// ChatAPI/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller'); // Controlador para la gestión de autenticación
const RefreshTokenController = require('../controllers/refresh_token.controller'); // Controlador para el refresco de tokens

// Rutas de autenticación
// Registrar un nuevo usuario
router.post('/register', AuthController.register);

// Iniciar sesión de un usuario y obtener tokens, y refrescar el token automáticamente
router.post('/login', AuthController.login, RefreshTokenController.refreshToken);

// Refrescar el token de acceso utilizando el refresh token
router.post('/refresh-token', RefreshTokenController.refreshToken);

module.exports = router;
// ChatAPI/routes/group.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify_token.middleware');
const GroupController = require('../controllers/group.controller'); // Controlador para la gestión de grupos

// Rutas de grupos
// Crear un nuevo grupo
router.post('/', verifyToken, GroupController.createGroup);

// Obtener todos los grupos del usuario autenticado
router.get('/', verifyToken, GroupController.getUserGroups);

// Actualizar un grupo específico por ID
router.put('/:groupId', verifyToken, GroupController.updateGroup);

// Eliminar un grupo específico por ID
router.delete('/:groupId', verifyToken, GroupController.deleteGroup);

// Obtener miembros de un grupo específico por ID
router.get('/:groupId/members', verifyToken, GroupController.getGroupMembers);

module.exports = router;
// ChatAPI/routes/message.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify_token.middleware');
const MessageController = require('../controllers/message.controller'); // Controlador para la gestión de mensajes

// Rutas de mensajes
// Enviar un nuevo mensaje
router.post('/', verifyToken, MessageController.sendMessage);

// Obtener mensajes de un chat específico por ID
router.get('/:chatId', verifyToken, MessageController.getMessages);

module.exports = router;
// ChatAPI/routes/notification.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify_token.middleware');
const NotificationController = require('../controllers/notification.controller'); // Controlador para la gestión de notificaciones

// Rutas de notificaciones
// Obtener todas las notificaciones del usuario autenticado
router.get('/', verifyToken, NotificationController.getNotifications);

// Crear una nueva notificación
router.post('/', verifyToken, NotificationController.createNotification);

// Eliminar una notificación por ID
router.delete('/:id', verifyToken, NotificationController.deleteNotification);

module.exports = router;
// ChatAPI/routes/user.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify_token.middleware');
const UserController = require('../controllers/user.controller'); // Controlador para la gestión de usuarios

// Rutas de usuarios
// Obtener el perfil del usuario autenticado
router.get('/profile', verifyToken, UserController.getUserProfile);

// Actualizar el perfil del usuario autenticado
router.put('/profile', verifyToken, UserController.updateUserProfile);

// Obtener el estado del usuario autenticado
router.get('/status', verifyToken, UserController.getUserStatus);

module.exports = router;