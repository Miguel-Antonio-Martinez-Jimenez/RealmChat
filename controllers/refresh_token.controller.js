// ChatAPI/controllers/refresh_token.controller.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Refrescar el Token de los Usuarios
exports.refreshToken = async (req, res) => {
    const { token } = req.body;

    try {
        // Verificar que se proporcionó un token
        if (!token) return res.status(401).json({ message: 'El token es requerido' });

        // Verificar y decodificar el token usando la clave secreta de refresco
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        
        // Buscar el usuario en la base de datos
        const user = await User.findByPk(payload.id);
        if (!user || user.refreshToken !== token) return res.status(403).json({ message: 'Refresh token no válido' });

        // Generar un nuevo token de acceso
        const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        // Devolver el nuevo token de acceso al cliente
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(401).json({ error: 'Token no válido o expirado' });
    }
};