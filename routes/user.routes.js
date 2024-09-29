// ChatAPI/routes/user.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify_token.middleware'); // Middleware para verificar el token
const UserController = require('../controllers/user.controller'); // Controlador para la gestión de usuarios

// Rutas de usuarios
// Obtener todos los usuarios
router.get('/users', UserController.getAllUsers);

router.get('/email/:email', UserController.getUserByEmail);

// Obtener el perfil del usuario autenticado
router.get('/profile', verifyToken, UserController.getUserProfile); // Devuelve el perfil del usuario autenticado

// Actualizar el perfil del usuario autenticado
router.put('/profile', verifyToken, UserController.updateUserProfile); // Actualiza el perfil del usuario autenticado

// Obtener el estado del usuario autenticado
router.get('/status', verifyToken, UserController.getUserStatus); // Devuelve el estado del usuario autenticado

module.exports = router;