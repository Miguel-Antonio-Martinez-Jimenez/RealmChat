// ChatAPI/controllers/group.controller.js
const Group = require('../models/group.model');
const GroupMember = require('../models/group_members.model');
const User = require('../models/user.model');

// Crear un Grupo 
exports.createGroup = async (req, res) => {
    const { name, description } = req.body; // Lista de IDs de usuarios
    const admin_id = req.user.id; // Extraer del token

    // Validación básica
    if (!name || !admin_id) {
        return res.status(400).json({ error: 'El nombre del grupo y el ID del administrador son obligatorios.' });
    }

    try {
        // Crear el grupo
        const group = await Group.create({ name, description, admin_id });
        res.status(201).json({ message: 'Grupo creado exitosamente.', group });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener los Grupos del Usuario
exports.getUserGroups = async (req, res) => {
    const user_id = req.user.id; // Extraer del token

    try {
        const groups = await GroupMember.findAll({
            where: { user_id },
            include: [{ model: Group }]
        });
        res.json(groups);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Actualizar Grupo
exports.updateGroup = async (req, res) => {
    const { groupId } = req.params;
    const { name, description } = req.body;

    try {
        const group = await Group.update({ name, description }, { where: { id: groupId } });
        if (!group) {
            return res.status(404).json({ error: 'Grupo no encontrado' });
        }
        res.status(200).json({ message: 'Grupo actualizado exitosamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar Grupo
exports.deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const deletedGroup = await Group.destroy({ where: { id: groupId } });
        if (!deletedGroup) {
            return res.status(404).json({ error: 'Grupo no encontrado' });
        }
        res.status(200).json({ message: 'Grupo eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener miembros de un Grupo
exports.getGroupMembers = async (req, res) => {
    const { groupId } = req.params;

    try {
        const members = await GroupMember.findAll({
            where: { group_id: groupId },
            include: [{ model: User, attributes: ['id', 'username', 'email'] }] // Asegúrate de importar el modelo User si lo necesitas
        });

        if (members.length === 0) {
            return res.status(404).json({ message: 'No hay miembros en este grupo.' });
        }

        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};