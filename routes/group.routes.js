// ChatAPI/routes/group.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify_token.middleware'); // Middleware para verificar el token
const GroupController = require('../controllers/group.controller'); // Controlador para la gestión de grupos

// Rutas de grupos
// Crear un nuevo grupo
router.post('/', verifyToken, GroupController.createGroup); // Crea un nuevo grupo para el usuario autenticado

// Obtener todos los grupos del usuario autenticado
router.get('/', verifyToken, GroupController.getUserGroups); // Devuelve todos los grupos del usuario autenticado

// Actualizar un grupo específico por ID
router.put('/:groupId', verifyToken, GroupController.updateGroup); // Actualiza la información de un grupo específico utilizando su ID

// Eliminar un grupo específico por ID
router.delete('/:groupId', verifyToken, GroupController.deleteGroup); // Elimina un grupo específico utilizando su ID

// Obtener miembros de un grupo específico por ID
router.get('/:groupId/members', verifyToken, GroupController.getGroupMembers); // Devuelve los miembros de un grupo específico utilizando su ID

module.exports = router;