// ChatAPI/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller'); // Controlador para la gestión de autenticación
const RefreshTokenController = require('../controllers/refresh_token.controller'); // Controlador para el refresco de tokens
const verifyToken = require('../middlewares/verify_token.middleware'); // Middleware para verificar el token

// Rutas de autenticación
// Registrar un nuevo usuario
router.post('/register', AuthController.register); // Registra un nuevo usuario en el sistema

// Iniciar sesión de un usuario y obtener tokens, y refrescar el token automáticamente
router.post('/login', AuthController.login, RefreshTokenController.refreshToken); // Inicia sesión y genera un token de acceso y uno de refresco

// Refrescar el token de acceso utilizando el refresh token
router.post('/refresh-token', RefreshTokenController.refreshToken); // Refresca el token de acceso utilizando el refresh token

// ChatAPI/routes/auth.routes.js
router.post('/logout', verifyToken, AuthController.logout); // Ruta para cerrar sesión

module.exports = router;