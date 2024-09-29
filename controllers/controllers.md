// ChatAPI/controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Asegúrate de que este modelo exista
const RefreshTokenController = require('./refresh_token.controller'); // Asegúrate de que el controlador esté correctamente importado

// Registro de Usuarios
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'Usuario registrado con éxito', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Iniciar Sesion
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Lógica para verificar el usuario...
        const user = await User.findOne({ email });

        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar tokens
        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        // Guardar el refreshToken en el usuario
        user.refreshToken = refreshToken;
        await user.save();

        // Realizar el refresco automático del token
        const newAccessToken = await RefreshTokenController.refreshToken(user._id); // Llama a la función de refresco

        res.json({
            accessToken: newAccessToken,
            refreshToken: refreshToken,
            user: { id: user._id, email: user.email } // Devuelve el usuario sin la contraseña
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ChatAPI/controllers/group.controller.js
const Group = require('../models/group.model');
const GroupMember = require('../models/group_members.model');

// Crear un Grupo
exports.createGroup = async (req, res) => {
    const { name, description, members } = req.body; // Lista de IDs de usuarios
    const admin_id = req.user.id; // Extraer del token

    try {
        const group = await Group.create({ name, description, admin_id });
        await GroupMember.create({ group_id: group.id, user_id: admin_id }); // Agregar admin como miembro

        // Agregar miembros al grupo
        for (const member of members) {
            await GroupMember.create({ group_id: group.id, user_id: member });
        }

        res.status(201).json({ message: 'Grupo creado', group });
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
        res.json({ message: 'Grupo actualizado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar Grupo
exports.deleteGroup = async (req, res) => {
    const { groupId } = req.params;

    try {
        const deletedGroup = await Group.destroy({ where: { id: groupId } });
        if (!deletedGroup) {
            return res.status(404).json({ error: 'Grupo no encontrado' });
        }
        res.json({ message: 'Grupo eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
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
// ChatAPI/controllers/refresh_token.controller.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Refrescar el Token de los Usuarios
exports.refreshToken = async (req, res) => {
    const { token } = req.body;

    try {
        // Verificar que se proporcionó un token
        if (!token) return res.status(401).json({ message: 'El token es requerido' });

        // Verificar y decodificar el token usando la clave secreta de acceso
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        
        // Buscar el usuario en la base de datos
        const user = await User.findByPk(payload.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Generar un nuevo token usando la clave secreta de acceso
        const newToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        // Devolver el nuevo token al cliente
        res.json({ token: newToken });
    } catch (error) {
        // Manejar cualquier error que ocurra
        res.status(401).json({ error: 'Token no válido o expirado' });
    }
};
const User = require('../models/user.model'); // Asegúrate de que esto esté correcto
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Obtener y Actualizar el Perfil de Usuario
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { username, email, status_message } = req.body;
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.username = username;
        user.email = email;
        user.status_message = status_message; // Actualiza el estado
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Estado en Línea
exports.updateUserStatus = async (req, res) => {
    const { online } = req.body; // Booleano que indica si está en línea
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.isOnline = online; // Campo booleano en el modelo User
    await user.save();
    res.json({ message: 'Estado actualizado' });
};

// Bloquear Usuario
exports.blockUser = async (req, res) => {
    const { userId } = req.body; // ID del usuario a bloquear

    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Asegurarse de que el usuario no se bloquee a sí mismo
        if (user.id === userId) return res.status(400).json({ message: 'No puedes bloquearte a ti mismo' });

        // Agregar el ID del usuario bloqueado a la lista de usuarios bloqueados
        user.blockedUsers = [...user.blockedUsers, userId]; // Suponiendo que blockedUsers es un campo del modelo
        await user.save();

        res.json({ message: 'Usuario bloqueado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Desbloquear Usuario
exports.unblockUser = async (req, res) => {
    const { userId } = req.body; // ID del usuario a desbloquear

    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Verificar si el usuario está en la lista de bloqueados
        if (!user.blockedUsers.includes(userId)) {
            return res.status(400).json({ message: 'Usuario no está bloqueado' });
        }

        // Eliminar el ID del usuario bloqueado de la lista
        user.blockedUsers = user.blockedUsers.filter(id => id !== userId);
        await user.save();

        res.json({ message: 'Usuario desbloqueado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Obtener Usuarios Bloqueados
exports.getBlockedUsers = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.json({ blockedUsers: user.blockedUsers });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};
// ChatAPI/middlewares/verify_token.middleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido' });
        }
        req.user = user; // Guardar la información del usuario en la solicitud
        next();
    });
};

module.exports = verifyToken;
# Configuración de la Base De Datos (MySQL)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=chatapi

# Puerto del Servidor
PORT=3005

# Json Web Token (JWT)
ACCESS_TOKEN_SECRET = jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225
REFRESH_TOKEN_SECRET = 825y8i3hnfjmsbv7gwajbl7fobqrjfvbs7gbfj2q3bgh8f42
