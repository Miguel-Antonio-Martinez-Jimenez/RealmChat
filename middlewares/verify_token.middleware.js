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