// ChatAPI/routes/message.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify_token.middleware'); // Middleware para verificar el token
const MessageController = require('../controllers/message.controller'); // Controlador para la gestión de mensajes

// Rutas de mensajes
// Enviar un nuevo mensaje
router.post('/', verifyToken, MessageController.sendMessage); // Envía un nuevo mensaje en el chat

// Obtener mensajes de un chat específico por ID
router.get('/:chatId', verifyToken, MessageController.getMessages); // Devuelve todos los mensajes de un chat específico utilizando su ID

module.exports = router;