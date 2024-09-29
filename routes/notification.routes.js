// ChatAPI/routes/notification.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify_token.middleware'); // Middleware para verificar el token
const NotificationController = require('../controllers/notification.controller'); // Controlador para la gestión de notificaciones

// Rutas de notificaciones
// Obtener todas las notificaciones del usuario autenticado
router.get('/', verifyToken, NotificationController.getNotifications); // Devuelve todas las notificaciones del usuario autenticado

// Crear una nueva notificación
router.post('/', verifyToken, NotificationController.createNotification); // Crea una nueva notificación para el usuario autenticado

// Eliminar una notificación por ID
router.delete('/:id', verifyToken, NotificationController.deleteNotification); // Elimina una notificación específica utilizando su ID

module.exports = router;