const User = require('../models/user.model'); // Asegúrate de que esto esté correcto
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Obtener todos los usuarios
        res.json(users); // Enviar la lista de usuarios
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Obtener el Perfil de Usuario
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

// Buscar usuario por email
exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;
  
    try {
        const user = await User.findOne({ where: { email } }); // Busca el usuario por email
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ user }); // Devuelve el usuario encontrado
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Actualizar el Perfil de Usuario
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

// Obtener el Estado del Usuario
exports.getUserStatus = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ isOnline: user.isOnline }); // Devuelve el estado en línea
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
