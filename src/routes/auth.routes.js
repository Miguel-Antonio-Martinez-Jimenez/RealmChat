const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { refreshToken } = require('../controllers/refresh_token.controller');
const verifyToken = require('../middlewares/verify_token.middleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login, refreshToken);
router.post('/logout', verifyToken, AuthController.logout);

module.exports = router;