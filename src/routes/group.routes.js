const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/group.controller');
const verifyToken = require('../middlewares/verify_token.middleware');

router.get('/', verifyToken, GroupController.getGroupsByUser); // Obtener grupos de un usuario

router.post('/create', verifyToken, GroupController.createGroup); // Crear un nuevo grupo

router.post('/add-member', verifyToken, GroupController.addGroupMember); // Añadir un miembro a un grupo

router.post('/remove-member', verifyToken, GroupController.removeGroupMember); // Eliminar un miembro de un grupo

router.put('/edit', verifyToken, GroupController.editGroup); // Editar un grupo

router.delete('/delete', verifyToken, GroupController.deleteGroup); // Eliminar un grupo

router.post('/leave', verifyToken, GroupController.leaveGroup); // Salir de un grupo

module.exports = router;