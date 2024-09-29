// ChatAPI/controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Asegúrate de que este modelo exista
const bcrypt = require('bcrypt');
const { DATEONLY, DATE } = require('sequelize');

// Registro de Usuarios
exports.register = async (req, res) => {
    try 
    {
        const { username, email, phone_number, password } = req.body;
        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) 
        {
            return res.status(400).json({ message: "Usuario Existente." });
        }
        else
        {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, phone_number, password: hashedPassword });
            res.status(201).json({ message: "Usuario Registrado con Exito.", user });
        }
    } catch (error) {1
        console.error(error);
        res.status(500).json({ error: "Error Interno del Servidor", details: error.message });
    }
};

// Iniciar Sesion
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        await User.update({ refresh_token: refreshToken, is_online: true }, { where: { id: user.id } });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Inicio de Sesion Exitosa.",
            accessToken: accessToken,
            refreshToken: refreshToken,  // Incluye el refreshToken en el cuerpo de la respuesta
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cerrar Sesion
exports.logout = async (req, res) => {
    try {
        const userId = req.user.id; // Suponiendo que req.user contiene la info del usuario autenticado
        const currentDateTime = new Date().toISOString();

        // Actualiza el estado del usuario, el refresh token, y establece last_seen
        await User.update(
            { is_online: false, refresh_token: null, last_seen: currentDateTime },
            { where: { id: userId } }
        );

        res.clearCookie('refreshToken');
        res.status(200).json({ message: "Sesión cerrada correctamente." });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};