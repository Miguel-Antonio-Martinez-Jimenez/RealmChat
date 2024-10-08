const User = require('../models/user.model');
const Contact = require('../models/contact.model');
const { validateEmail } = require('../services/validate_email');

// Funcion para obtener todos los contactos de un usuario.
exports.getAllContacts = async (req, res) => 
{
    try 
    {
        const userId = req.user.id;
    
        const contacts = await Contact.findAll(
        {
            where: { user_id: userId },
            include: 
            [{
                model: User,
                as: 'contact',  // Relación definida en el modelo
                attributes: ['id', 'username', 'email', 'phone_number', 'status_message', 'last_seen', 'is_online'],
            }],
        });
    
        if (contacts.length === 0) 
        {
            // 404 Not Found: Solicitud no encontrada.
            return res.status(404).json({ message: 'No se encontraron contactos.' });
        }
    
        // 200 OK: Solicitud exitosa, datos devueltos correctamente.
        res.status(200).json({message: 'Contactos encontrados.', contacts });
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};

// Funcion para agregar un contacto por su email.
exports.addContactByEmail = async (req, res) => 
{
    try 
    {
        const { user_id, contact_email } = req.body;

        // Validar el formato del email.
        if (!validateEmail(contact_email)) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: "Formato del correo electronico no valido." });
        }

        // Verificar que el usuario que quiere agregar el contacto exista
        const user = await User.findOne({ where: { id: user_id } });

        // Buscar el contacto por email
        const contact = await User.findOne({ where: { email: contact_email } });
        if (!contact) 
        {
            // 404 Not Found: Solicitud no encontrada.
            return res.status(404).json({ message: 'Contacto no encontrado.' });
        }

        // Verificar si ya existe ese contacto
        const existingContact = await Contact.findOne(
        {
            where: 
            {
                user_id: user.id,
                contact_id: contact.id,
            },
        });

        if (existingContact) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: 'Este contacto ya está registrado.' });
        }

        // Crear el nuevo contacto
        const newContact = await Contact.create(
        {
            user_id: user.id,
            contact_id: contact.id,
        });

        // 201 Created: Recurso creado exitosamente tras la solicitud.
        res.status(201).json({ message: 'Contacto agregado exitosamente.', contact: newContact });
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};

// Eliminar un contacto por email.
exports.deleteContact = async (req, res) => 
{
    try 
    {
        const { userId, contactEmail } = req.body;

        // Validar el formato del email.
        if (!validateEmail(contactEmail)) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: "Formato del correo electronico no valido." });
        }
  
        const contact = await Contact.findOne(
        {
            where: {
            user_id: userId,
            },
            include: [{
            model: User,
            as: 'contact',
            where: { email: contactEmail },
            attributes: ['id'],
            }],
        });
    
        if (!contact) 
        {
            // 404 Not Found: Solicitud no encontrada.
            return res.status(404).json({ message: 'El contacto no ha sido encontrado.' });
        }
    
        await contact.destroy();
    
        // 200 OK: Solicitud exitosa, datos devueltos correctamente.
        res.status(200).json({ message: 'Contacto eliminado exitosamente.' });
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};