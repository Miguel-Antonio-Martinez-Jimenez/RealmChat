const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify_token.middleware');
const ContactController = require('../controllers/contact.controller');

router.get('/', verifyToken, ContactController.getAllContacts); // Agregar Un Contacto Por Email
router.post('/add', verifyToken, ContactController.addContactByEmail); // Agregar Un Contacto Por Email
router.delete('/', verifyToken, ContactController.deleteContact); // Eliminar Un Contacto.

module.exports = router;