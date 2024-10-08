const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { verifyPassword } = require('../services/verify_password');
const { validateEmail } = require('../services/validate_email');

// Función para registrar un nuevo usuario.
exports.register = async (req, res) => 
{
    try 
    {
        const { username, email, phone_number, password } = req.body;

        // Verificar que los campos obligatorios esten completos.
        if (!username || !email || !phone_number || !password) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Validar el formato del email.
        if (!validateEmail(email)) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: "Formato del correo electronico no valido." });
        }

        // Verificar si el usuario ya existe mediante email.
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) 
        {
            // 409 Conflict: Conflicto con el estado actual del recurso.
            return res.status(409).json({ message: "El usuario con este Email ya existe." });
        }
        else
        {
            // Verificar que el password cumpla con los requisitos de seguridad.
            if (!verifyPassword(password)) 
            {
                // 400 Bad Request: Error en la solicitud, parámetros inválidos.
                return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula." });
            }

            // Se hace hash a la contraseña para almacenarla de forma segura en la base de datos.
            const hashedPassword = await bcrypt.hash(password, 10);

            // Se crea el nuevo usuario en la base de datos con los datos proporcionados.
            const user = await User.create({ username, email, phone_number, password: hashedPassword });

            // 201 Created: Recurso creado exitosamente tras la solicitud.
            res.status(201).json({ message: "Usuario registrado exitosamente.", user });
        }
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};

// Función para iniciar sesión.
exports.login = async (req, res) => 
{
    try 
    {
        // Se obtienen los datos de email y password del cuerpo de la solicitud.
        const { email, password } = req.body;

        // Se verifica que tanto el email como la contraseña hayan sido proporcionados.
        if (!email || !password) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Se valida el formato del email.
        if (!validateEmail(email)) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: "Formato del correo electronico no valido." });
        }

        // Se verifica que la contraseña cumple con los requisitos mínimos.
        if (!verifyPassword(password)) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula." });
        }

        // Se busca al usuario en la base de datos por el email.
        const user = await User.findOne({ where: { email } });

        // Se verifica si el usuario existe y si la contraseña es correcta.
        if (!user || !(await bcrypt.compare(password, user.password))) 
        {
            // 401 Unauthorized: Falta autenticación o credenciales inválidas.
            return res.status(401).json({ message: "Credenciales incorrectas, verifíquelas e inténtelo nuevamente." });
        }

        // Si las credenciales son válidas, se genera un token de acceso y un token de actualización.
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        // Se actualiza el token de actualización y el estado de "en línea" del usuario en la base de datos.
        await User.update({ refresh_token: refreshToken, is_online: true }, { where: { id: user.id } });

        // Se envía el token de actualización como cookie y se devuelve el mensaje de éxito.
        res.cookie('refreshToken', refreshToken, 
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // 200 OK: Solicitud exitosa, datos devueltos correctamente.
        res.status(200).json(
        {
            message: "Has iniciado sesión correctamente.",
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: { id: user.id, email: user.email }
        });
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};

// Función para cerrar sesión.
exports.logout = async (req, res) => 
{
    try 
    {
        // Se obtiene el ID del usuario que está cerrando sesión.
        const userId = req.user.id;
        const currentDateTime = new Date().toISOString(); // Se obtiene la hora actual.

        // Se actualiza el estado del usuario en la base de datos para indicar que está "desconectado" y se borra el token de actualización.
        await User.update(
            { is_online: false, refresh_token: null, last_seen: currentDateTime },
            { where: { id: userId } }
        );

        // Se elimina la cookie del token de actualización.
        res.clearCookie('refreshToken');

        // 200 OK: Solicitud exitosa, datos devueltos correctamente.
        res.status(200).json({ message: "La sesión se completó con éxito." });
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};