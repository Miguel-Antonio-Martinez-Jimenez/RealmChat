const Group = require('../models/group.model');
const GroupMember = require('../models/group_members.model');
const User = require('../models/user.model');
const { validateEmail } = require('../services/validate_email');

// Obtener los grupos de un usuario
exports.getGroupsByUser = async (req, res) => 
{
    try 
    {
        const user_id = req.user.id;
        const groups = await GroupMember.findAll(
        {
            where: 
            { 
                user_id 
            },
            include: [
            {
                model: Group,
                as: 'group',
            }]
        });

        if (groups.length === 0) 
        {
            // 404 Not Found: Solicitud no encontrada.
            return res.status(404).json({ message: 'No se encontraron grupos.' });
        }

        // 200 OK: Solicitud exitosa, datos devueltos correctamente.
        res.status(200).json({ message: "Grupos obtenidos correctamente.", groups });
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};

// Crear un nuevo grupo
exports.createGroup = async (req, res) => 
{
     try 
    {
        const { name, description } = req.body;
        const admin_id = req.user.id;
    
        if (!name || !description) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: 'El nombre y la descripción del grupo son obligatorios.' });
        }
    
        // Verificar si ya existe un grupo con el mismo nombre
        const existingGroup = await Group.findOne({ where: { name } });
        if (existingGroup) 
        {
            // 409 Conflict: Solicitud en conflicto, grupo existente con el mismo nombre.
            return res.status(409).json({ message: 'Ya existe un grupo con el mismo nombre.' });
        }
    
        // Crear el nuevo grupo
        const group = await Group.create({ name, description, admin_id });
    
        await GroupMember.create(
        {
            group_id: group.id,
            user_id: admin_id,
            added_by: admin_id,
        });
    
        // 201 Created: Recurso creado exitosamente tras la solicitud.
        res.status(201).json({ message: 'Grupo creado exitosamente.', group });
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};
    
// Añadir un contacto de un grupo
exports.addGroupMember = async (req, res) => 
{
    try 
    {
        const { group_id, email } = req.body;
        const added_by  = req.user.id;

        // Verificar que se haya proporcionado el correo electrónico
        if (!email) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: 'El correo electrónico es obligatorio.' });
        }

        // Validar el formato del email.
        if (!validateEmail(email)) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: "Formato del correo electronico no valido." });
        }
        
        // Buscar el usuario por correo electrónico
        const user = await User.findOne({ where: { email } });
        
        // Si no encuentra el usuario, permitir agregar usuarios externos (fuera de los contactos)
        if (!user) 
        {
            // 404 Not Found: Solicitud no encontrada.
            return res.status(404).json({ message: 'No se encontró un usuario con este correo electrónico.' });
        }

        // Comprobar si el miembro ya existe en el grupo
        const existingMember = await GroupMember.findOne({ where: { group_id, user_id: user.id } });
        if (existingMember) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: 'El usuario ya es miembro del grupo.' });
        }

        // Agregar al miembro al grupo
        console.log(group_id, user.id, added_by );
        await GroupMember.create({ group_id, user_id: user.id, added_by });

        // 201 Created: Recurso creado exitosamente tras la solicitud.
        res.status(201).json({ message: 'Miembro añadido al grupo exitosamente.' });
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};

// Eliminar un contacto de un grupo
exports.removeGroupMember = async (req, res) => 
{
    try 
    {
        const { group_id, email } = req.body;

        // Verificar que se haya proporcionado el correo electrónico
        if (!email) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: 'El correo electrónico es obligatorio.' });
        }

        // Validar el formato del email.
        if (!validateEmail(email)) 
        {
            // 400 Bad Request: Error en la solicitud, parámetros inválidos.
            return res.status(400).json({ message: "Formato del correo electronico no valido." });
        }

        // Buscar al usuario por su correo electrónico
        const user = await User.findOne({ where: { email } });
        if (!user) 
        {
            // 404 Not Found: Solicitud no encontrada.
            return res.status(404).json({ message: 'No se encontró un usuario con este correo electrónico en el grupo.' });
        }
    
        // Verificar si el usuario es miembro del grupo
        const member = await GroupMember.findOne({ where: { group_id, user_id: user.id } });
        if (!member) 
        {
            // 404 Not Found: Solicitud no encontrada.
            return res.status(404).json({ message: 'El usuario no es miembro del grupo.' });
        }
    
        // Eliminar al miembro del grupo
        await GroupMember.destroy({ where: { group_id, user_id: user.id } });

        // 200 OK: Solicitud exitosa, datos devueltos correctamente.
        res.status(200).json({ message: 'Miembro eliminado del grupo exitosamente.' });
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};

// Editar un grupo
exports.editGroup = async (req, res) => 
{
    try 
    {
        const { group_id, name, description } = req.body;

        if (!name || !description) 
            {
                // 400 Bad Request: Error en la solicitud, parámetros inválidos.
                return res.status(400).json({ message: 'El nombre y la descripcion del grupo son obligatorios.' });
            }
  
        const group = await Group.findByPk(group_id);
        if (!group) 
        {
            return res.status(404).json({ message: 'Grupo no encontrado.' });
        }
  
        group.name = name || group.name;
        group.description = description || group.description;
        await group.save();
  
      res.status(200).json({ message: 'Grupo editado exitosamente.', group });
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};

// Eliminar un grupo
exports.deleteGroup = async (req, res) => 
{
    try 
    {
        const { group_id } = req.body;
        const user_id = req.user.id; // El ID del usuario que realiza la solicitud
  
        // Buscar si el grupo existe
        const group = await Group.findByPk(group_id);
        if (!group) 
        {
            return res.status(404).json({ message: 'Grupo no encontrado.' });
        }

        // Eliminar todos los miembros asociados al grupo
        await GroupMember.destroy({ where: { group_id } });

        // Verificar si el usuario es el administrador del grupo
        if (group.admin_id !== user_id) 
        {
            return res.status(403).json({ message: 'No tienes permisos para eliminar este grupo.' });
        }

        // Eliminar el grupo
        await Group.destroy({ where: { id: group_id } });
    
        res.status(200).json({ message: 'Grupo y sus miembros eliminados exitosamente.' });
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};

// Salir de un grupo
exports.leaveGroup = async (req, res) => 
{
    try 
    {
        const { group_id } = req.body;
        const user_id = req.user.id;
    
        const member = await GroupMember.findOne({ where: { group_id, user_id } });
        if (!member) 
        {
            return res.status(404).json({ message: 'El usuario no es miembro del grupo.' });
        }
    
        await GroupMember.destroy({ where: { group_id, user_id } });
    
        res.status(200).json({ message: 'Has abandonado con éxito el grupo.' });
    } 
    catch (error) 
    {
        // 500 Internal Server Error: Error interno del servidor al procesar la solicitud.
        return res.status(500).json({ error: "Se produjo un error en el servidor.", details: error.message });
    }
};