// ChatAPI/controllers/notification.controller.js
const Notification = require('../models/notification.model');

// Obtener Notificaciones
exports.getNotifications = async (req, res) => {
    const userId = req.user.id; // Obtener el ID del usuario desde el token

    try {
        const notifications = await Notification.findAll({ where: { user_id: userId } });
        res.json(notifications);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Crear Notificación
exports.createNotification = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id; // Obtener el ID del usuario desde el token

    try {
        const notification = await Notification.create({ user_id: userId, content });
        res.status(201).json({ message: 'Notificación creada', notification });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar Notificación
exports.deleteNotification = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la notificación de los parámetros de la solicitud

    try {
        const deletedNotification = await Notification.destroy({ where: { id, user_id: req.user.id } }); // Verificar que la notificación pertenezca al usuario

        if (!deletedNotification) {
            return res.status(404).json({ error: 'Notificación no encontrada o no pertenece al usuario' });
        }

        res.json({ message: 'Notificación eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};