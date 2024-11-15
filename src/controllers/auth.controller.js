const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Notification = require('../models/notification.model');
const { validateEmail } = require('../services/validate_email');
const { verifyUsername } = require('../services/verify_username');
const { verifyPassword } = require('../services/verify_password');
const { verifyPhoneNumber } = require('../services/verify_phonenumber');

// Función para registrar un nuevo usuario.
exports.register = async (req, res) => 
{
    try 
    {
        const { username, email, phone_number, password } = req.body;

        if (!username || !email || !phone_number || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        if (!verifyUsername(username)) {
            return res.status(400).json({ message: "Nombre de usuario no válido. Debe tener entre 5 y 15 caracteres, solo letras, números, puntos o guion bajo, sin caracteres especiales al inicio o final, y sin puntos ni guiones bajos consecutivos." });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Formato del correo electrónico no válido." });
        }

        if (!verifyPhoneNumber(phone_number)) {
            return res.status(400).json({ message: "Formato del número de teléfono no válido. Debe ser exactamente de 10 dígitos." });
        }

        if (!verifyPassword(password)) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial." });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "El usuario con este correo electrónico ya existe." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ 
            username, 
            email, 
            phone_number, 
            password: hashedPassword 
        });

        res.status(201).json({ message: "Usuario registrado exitosamente.", user });
    } 
    catch (error) 
    {
        console.error("Error al registrar el usuario:", error);
        return res.status(500).json({ error: "Se ha producido un error inesperado en el servidor.", details: error.message });
    }
};

// Función para iniciar sesión.
exports.login = async (req, res) => 
{
    try 
    {
        const { email, password } = req.body;

        if (!email || !password) 
        {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        if (!validateEmail(email)) 
        {
            return res.status(400).json({ message: "Formato del correo electronico no valido." });
        }

        if (!verifyPassword(password)) 
        {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula." });
        }

        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Credenciales incorrectas, verifíquelas e inténtelo nuevamente." });
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        await User.update({ refresh_token: refreshToken, is_online: true }, { where: { id: user.id } });

        res.cookie('refreshToken', refreshToken, 
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

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
        return res.status(500).json({ error: "Se ha producido un error inesperado en el servidor.", details: error.message });
    }
};

// Función para cerrar sesión.
exports.logout = async (req, res) => 
{
    try 
    {
        const userId = req.user.id;
        const currentDateTime = new Date().toISOString(); // Se obtiene la hora actual.

        await User.update(
            { is_online: false, refresh_token: null, last_seen: currentDateTime },
            { where: { id: userId } }
        );

        res.clearCookie('refreshToken');

        res.status(200).json({ message: "La sesión se completó con éxito." });
    } 
    catch (error) 
    {
        return res.status(500).json({ error: "Se ha producido un error inesperado en el servidor.", details: error.message });
    }
};