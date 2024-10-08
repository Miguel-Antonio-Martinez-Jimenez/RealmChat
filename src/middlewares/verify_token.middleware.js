const jwt = require('jsonwebtoken'); // Se importa el módulo 'jsonwebtoken' para verificar el token JWT.

// Middleware para verificar si el token es válido.
const verifyToken = (req, res, next) => 
{
    // Se obtiene el token del encabezado de autorización de la solicitud (header 'authorization').
    const token = req.headers['authorization']?.split(' ')[1];

    // Si no se proporciona el token, se devuelve un error 403.
    if (!token) 
    {
        return res.status(403).json({ message: 'Token no proporcionado.' });
    }

    // Se verifica el token usando el secreto almacenado en la variable de entorno 'ACCESS_TOKEN_SECRET'.
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => 
    {
        // Si el token no es válido o ha expirado, se devuelve un error 403.
        if (err) 
        {
            return res.status(403).json({ message: 'Token invalido.' });
        }

        // Si el token es válido, se asigna el usuario decodificado a la solicitud para usarlo más adelante.
        req.user = user;
        
        // Se llama a 'next()' para continuar con la siguiente función en la cadena de middlewares.
        next();
    });
};

// Se exporta el middleware 'verifyToken' para que pueda ser utilizado en otras partes de la aplicación.
module.exports = verifyToken;