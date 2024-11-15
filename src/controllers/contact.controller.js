const User = require('../models/user.model');
const Contact = require('../models/contact.model');
const { validateEmail } = require('../services/validate_email');

// Funcion para obtener todos los contactos de un usuario. 
exports.getAllContacts = async (req, res) => {
    try 
    {
        const userId = req.user.id;
        
        const contacts = await Contact.findAll(
        {
            where: { user_id: userId },
            include: 
            [{
                model: User,
                as: 'contact',
                attributes: ['id', 'username', 'email', 'phone_number', 'status_message', 'last_seen', 'is_online'],
            }],
        });
        
        if (contacts.length === 0) 
        {
            return res.status(404).json({ message: 'No se encontraron contactos.' });
            }
        
            res.status(200).json({message: 'Contactos encontrados.', contacts });
        } 
    catch (error) 
    {
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};

// Funcion para agregar un contacto por su email.
exports.addContactByEmail = async (req, res) => {
    try {
        const { contact_email } = req.body;
        const user_id = req.user.id;

        if (!contact_email) {
            return res.status(400).json({ message: "El campo Email es obligatorio." });
        }

        if (!validateEmail(contact_email)) {
            return res.status(400).json({ message: "Formato del correo electrónico no válido." });
        }

        const user = await User.findOne({ where: { id: user_id } });
        const contact = await User.findOne({ where: { email: contact_email } });
        
        if (!contact) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Verifica si el contacto ya existe en la tabla Contact
        const existingContact = await Contact.findOne({
            where: { user_id: user.id, contact_id: contact.id },
        });
        
        if (existingContact) {
            return res.status(400).json({ message: 'Este usuario ya existe entre tus contactos.' });
        }

        // Crea la relación de contactos
        await Contact.create({
            user_id: user.id,
            contact_id: contact.id,
        });
        await Contact.create({
            user_id: contact.id,
            contact_id: user.id,
        });

        /*await Contact.create({
            user_id: contact.id,
            contact_id: user.id,
        });*/
    
        res.status(201).json({ message: 'Contacto agregado exitosamente.' });
    } 
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Se ha producido un error inesperado en el servidor.", details: error.message });
    }
};
    
// Eliminar un contacto por email.
exports.deleteContact = async (req, res) => {
    try 
    {
        const { contact_email } = req.body;
        const user_id = req.user.id;
    
        if (!contact_email) {
            return res.status(400).json({ message: "El campo Email es obligatorios." });
        }
    
        if (!validateEmail(contact_email)) {
            return res.status(400).json({ message: "Formato del correo electronico no valido." });
        }
      
        const contact = await Contact.findOne({
        where: {
            user_id: user_id,
        },
        include: [{
            model: User,
            as: 'contact',
            where: { email: contact_email },
            attributes: ['id'],
            }],
        });
        
        if (!contact) {
            return res.status(404).json({ message: 'El contacto no ha sido encontrado.' });
        }
        
        await contact.destroy();
        
        res.status(200).json({ message: 'Contacto eliminado exitosamente.' });
    } 
    catch (error) 
    {
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};
    