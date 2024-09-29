// ChatAPI/controllers/contact.controller.js
const Contact = require('../models/contact.model');
const User = require('../models/user.model');

// Obtener todos los contactos de un usuario
exports.getAllContacts = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario no proporcionado.' });
    }

    const contacts = await Contact.findAll({
      where: { user_id: userId },
      include: [{
        model: User,
        as: 'contact', // Este 'as' debe coincidir con la asociación que definirás
        attributes: ['username', 'email'] // Solo seleccionamos lo que necesitamos
      }]
    });

    if (contacts.length > 0) {
      return res.status(200).json({ message: 'Contactos Obtenidos.', contacts });
    } else {
      return res.status(404).json({ message: 'No hay contactos.' });
    }
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).json({ message: 'Error al obtener los contactos', error: error.message });
  }
};

// Obtener la información de un usuario
exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'phone_number', 'status_message', 'is_online', 'last_seen'],
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Informacion de Contacto Obtenido.', contact: user });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la información del usuario', error: error.message });
  }
};

// Agregar un contacto por su email
exports.addContact = async (req, res) => {
  try {
      const { user_id, contact_id } = req.body;  // Cambié esto para obtener los datos directamente de req.body

      // Verificar que el contacto no exista ya en la lista de contactos del usuario
      const existingContact = await Contact.findOne({
          where: {
              user_id: user_id,
              contact_id: contact_id,
          },
      });

      if (existingContact) {
          return res.status(400).json({ message: 'El contacto ya esta Registrado.' });
      }

      // Crear el nuevo contacto
      const newContact = await Contact.create({
          user_id: user_id,
          contact_id: contact_id,
      });

      res.status(201).json({ message: 'Contacto agregado exitosamente.', contact: newContact });
  } catch (error) {
      res.status(500).json({ message: 'Error al agregar el contacto', error: error.message });
  }
};

// Eliminar un contacto por email
exports.deleteContact = async (req, res) => {
  try {
    const { userId, contactEmail } = req.body;

    // Buscar el contacto por email
    const contact = await Contact.findOne({
      where: {
        user_id: userId,
      },
      include: [{
        model: User,
        as: 'contact',
        where: { email: contactEmail }, // Filtrar por email del contacto
        attributes: ['id'], // Solo necesitas el ID para la eliminación
      }],
    });

    if (!contact) {
      return res.status(404).json({ message: 'El contacto no existe' });
    }

    await contact.destroy();

    res.status(200).json({ message: 'Contacto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el contacto', error: error.message });
  }
};