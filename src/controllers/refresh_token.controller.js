const jwt = require('jsonwebtoken'); // Se importa el módulo 'jsonwebtoken' para la creación y verificación de tokens JWT.
const User = require('../models/user.model'); // Se importa el modelo de usuario 'User' para interactuar con la base de datos de usuarios.

// Controlador para manejar la lógica del token de actualización (refresh token).
exports.refreshToken = async (req, res) => 
{
    // Se extrae el token del cuerpo de la solicitud (request body).
    const { token } = req.body;
    try 
    {
        // 401 Unauthorized: Falta autenticación o credenciales inválidas.
        if (!token) return res.status(401).json({ message: 'Se requiere token.' });
    
        // Se verifica el token utilizando el secreto almacenado en la variable de entorno 'REFRESH_TOKEN_SECRET'.
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            
        // Se busca al usuario en la base de datos por su ID, que fue almacenada en el token.
        const user = await User.findByPk(payload.id);
    
        // Si no se encuentra el usuario o el token no coincide, se devuelve un error 403.
        if (!user || user.refreshToken !== token) return res.status(403).json({ message: 'Token de actualización no válido.' });
    
        // Si el token es válido, se genera un nuevo token de acceso (access token) con una expiración de 15 minutos.
        const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
            
        // Se envía el nuevo token de acceso como respuesta en formato JSON.
        res.json({ accessToken: newAccessToken });
    } 
    catch (error) 
    {
        // 401 Unauthorized: Falta autenticación o credenciales inválidas.
        res.status(401).json({ error: 'Token invalido o expirado.' });
    }
};