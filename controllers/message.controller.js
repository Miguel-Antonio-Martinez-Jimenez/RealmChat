// ChatAPI/controllers/message.controller.js
const Message = require('../models/message.model');
const User = require('../models/user.model'); // Asegúrate de que esto esté correcto

// Enviar Mensajes
exports.sendMessage = async (req, res) => {
    const { receiver_id, group_id, content } = req.body;
    const sender_id = req.user.id; // Extraer del token

    try {
        const message = await Message.create({ sender_id, receiver_id, group_id, content });
        res.status(201).json({ message: 'Mensaje enviado', message });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener Mensajes
exports.getMessages = async (req, res) => {
    const { chatId } = req.params; // Puede ser ID de usuario o de grupo

    try {
        const messages = await Message.findAll({ where: { group_id: chatId } }); // Ajustar según tu lógica
        res.json(messages);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Marcar Mensaje como Leído
exports.markMessageAsRead = async (req, res) => {
    const { messageId } = req.params;
    try {
        const message = await Message.findByPk(messageId);
        if (!message) return res.status(404).json({ message: 'Mensaje no encontrado' });

        message.read = true; // Campo en el modelo para marcar como leído
        await message.save();
        res.json({ message: 'Mensaje marcado como leído' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar Mensaje
exports.deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    try {
        const deleted = await Message.destroy({ where: { id: messageId, sender_id: req.user.id } });
        if (!deleted) return res.status(404).json({ message: 'Mensaje no encontrado' });
        res.json({ message: 'Mensaje eliminado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
