// ChatAPI/routes/contact.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify_token.middleware');
const ContactController = require('../controllers/contact.controller');

// Obtener todos los contactos de un usuario
router.get('/:userId', verifyToken, ContactController.getAllContacts);

// Agregar un contacto por email
router.post('/add', verifyToken, ContactController.addContact);

// Obtener información de un usuario
router.get('/info/:userId', verifyToken, ContactController.getUserInfo);

// Eliminar un contacto
router.delete('/delete', verifyToken, ContactController.deleteContact);

module.exports = router;