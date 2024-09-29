const request = require('supertest');
const app = require('../server');

describe(' Pruebas de Software - Auth ', () => 
{
    // (Registrar Usuario)
    test('Registrar un Usuario Nuevo', async () => 
    {
        const NewUser = 
        {
            username: "Usuario1",
            email: "Usuario1@ejemplo.com",
            phone_number: "1234567890",
            password: "Correcta"
        };
        
        const response = await request(app)
        .post('/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(201);

        expect(response.body.message).toBe('Usuario Registrado con Exito.');
        expect(response.body.user.username).toBe(NewUser.username);
        expect(response.body.user.email).toBe(NewUser.email);
    });
    test('Registrar un Usuario Existente', async () => 
    {
        const ExistingUser  = 
        {
            username: "Usuario1",
            email: "Usuario1@ejemplo.com",
            phone_number: "1234567890",
            password: "Correcta"
        };
        
        const response = await request(app)
        .post('/auth/register')
        .send(ExistingUser)
        .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body.message).toBe('Usuario Existente.');
    });

    // (Iniciar Sesion)
    test('Iniciar Sesión de un Usuario', async () => 
        {
            const loginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcta"
            };
        
            const response = await request(app)
            .post('/auth/login')
            .send(loginUser)
            .expect('Content-Type', /json/)
            .expect(200);
        
            expect(response.body.message).toBe('Inicio de Sesion Exitosa.');
            expect(response.body.accessToken).toBeDefined();
            expect(response.body.user.email).toBe(loginUser.email);
            
            const cookies = response.headers['set-cookie'];
            expect(cookies).toBeDefined();
            expect(cookies[0]).toContain('refreshToken');
    });
    test('Usuario y/o Contraseña Incorrecta', async () => 
        {
            const invalidLoginUser = 
            {
                email: "Usuario2@ejemplo.com",
                password: "Incorrecta"
            };
        
            const response = await request(app)
            .post('/auth/login')
            .send(invalidLoginUser)
            .expect('Content-Type', /json/)
            .expect(401);
    
            expect(response.body.message).toBe('Credenciales inválidas');
    });

    // (Cerrar Sesion)
    test('Cerrar Sesion de un Usuario', async () => 
        {
            const loginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcta"
            };
            
            const loginResponse = await request(app)
            .post('/auth/login')
            .send(loginUser)
            .expect('Content-Type', /json/)
            .expect(200);
            
            const token = loginResponse.body.accessToken;
            
            const response = await request(app)
            .post('/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: loginResponse.body.user.id })
            .expect('Content-Type', /json/)
            .expect(200);
            
            expect(response.body.message).toBe('Sesión cerrada correctamente.');
    });
});

describe(' Pruebas de Software - Contact ', () => 
{
    // (Agregar Contacto)
    test('Agregar un Contacto', async () => 
    {
        const loginUser = 
        {
            email: "Usuario1@ejemplo.com",
            password: "Correcta"
        };
    
        const loginResponse = await request(app)
        .post('/auth/login')
        .send(loginUser)
        .expect('Content-Type', /json/)
        .expect(200);
    
        const token = loginResponse.body.accessToken;
    
        const contactEmailToAdd = "Usuario2@ejemplo.com";
    
        const userResponse = await request(app)
        .get(`/user/email/${contactEmailToAdd}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);
    
        const contactUserId = userResponse.body.user.id;
    
        const newContact = 
        {
            user_id: loginResponse.body.user.id,
            contact_id: contactUserId
        };
    
        const response = await request(app)
        .post('/contact/add')
        .set('Authorization', `Bearer ${token}`)
        .send(newContact)
        .expect('Content-Type', /json/)
        .expect(201);
    
        expect(response.body.message).toBe('Contacto agregado exitosamente.');
    });
    test('Agregar un Contacto ya Aregado', async () => 
    {
        const loginUser = 
        {
            email: "Usuario1@ejemplo.com",
            password: "Correcta"
        };
        
        const loginResponse = await request(app)
        .post('/auth/login')
        .send(loginUser)
        .expect('Content-Type', /json/)
        .expect(200);
        
        const token = loginResponse.body.accessToken;
        
        const contactEmailToAdd = "Usuario2@ejemplo.com";
        
        const userResponse = await request(app)
        .get(`/user/email/${contactEmailToAdd}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);
        
        const contactUserId = userResponse.body.user.id;
        
        const newContact = 
        {
            user_id: loginResponse.body.user.id,
            contact_id: contactUserId
        };
        
        const response = await request(app)
        .post('/contact/add')
        .set('Authorization', `Bearer ${token}`)
        .send(newContact)
        .expect('Content-Type', /json/)
        .expect(400);
        
        expect(response.body.message).toBe('El contacto ya esta Registrado.');
    });

    // (Obtener Contacto)
    test('Obtener Contactos de un Usuario', async () => 
        {
            const loginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcta"
            };
        
            const loginResponse = await request(app)
            .post('/auth/login')
            .send(loginUser)
            .expect('Content-Type', /json/)
            .expect(200);
        
            const token = loginResponse.body.accessToken;
        
            const response = await request(app)
            .get(`/contact/${loginResponse.body.user.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);
        
            expect(response.body.message).toBe('Contactos Obtenidos.');
            expect(Array.isArray(response.body.contacts)).toBe(true);
            expect(response.body).toHaveProperty('contacts');
    });

    // (Eliminar un Contacto)
    test('Eliminar un Contacto por Email', async () => 
        {
            const loginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcta"
            };
            
            const loginResponse = await request(app)
            .post('/auth/login')
            .send(loginUser)
            .expect('Content-Type', /json/)
            .expect(200);
            
            const token = loginResponse.body.accessToken;
    
            const contactsResponse = await request(app)
            .get(`/contact/${loginResponse.body.user.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);
            
            const contactEmailToDelete = contactsResponse.body.contacts[0].contact.email; // Obtener el email del contacto a eliminar
                
            const response = await request(app)
            .delete('/contact/delete')
            .set('Authorization', `Bearer ${token}`)
            .send(
            {
                userId: loginResponse.body.user.id,
                contactEmail: contactEmailToDelete // Enviar el email en lugar del ID
            })
            .expect('Content-Type', /json/)
            .expect(200);
            
            expect(response.body).toHaveProperty('message', 'Contacto eliminado exitosamente');
    });
});

describe(' Pruebas de Software - Group ', () => 
{
    // (Crear Grupo)
    test('Crear un Grupo', async () => 
    {
        const loginUser = 
        {
            email: "Usuario1@ejemplo.com",
            password: "Correcta"
        };
    
        const loginResponse = await request(app)
        .post('/auth/login')
        .send(loginUser)
        .expect('Content-Type', /json/)
        .expect(200);
    
        const token = loginResponse.body.accessToken;

        const NewGroup = 
        {
            name: "Grupo",
            description: "Hola Mundo",
            admin_id: loginResponse.body.id
        };

        const response = await request(app)
        .post('/group/')
        .set('Authorization', `Bearer ${token}`)
        .send(NewGroup)
        .expect('Content-Type', /json/)
        .expect(201);

        expect(response.body.message).toBe('Grupo creado exitosamente.');
    });

    // (Obtener Grupo)
    test('Obtener Grupos de un Usuario', async () => 
    {
        const loginUser = 
        {
            email: "Usuario1@ejemplo.com",
            password: "Correcta"
        };
    
        const loginResponse = await request(app)
        .post('/auth/login')
        .send(loginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const response = await request(app)
        .get('/group/')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toBeInstanceOf(Array);
    });
    test('No Hay Miembros de un Grupos de un Usuario', async () => 
    {
        const loginUser = 
        {
            email: "Usuario1@ejemplo.com",
            password: "Correcta"
        };
    
        const loginResponse = await request(app)
        .post('/auth/login')
        .send(loginUser)
        .expect('Content-Type', /json/)
        .expect(200);
    
        const token = loginResponse.body.accessToken;

        const Groupresponse = await request(app)
        .get('/group/')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

        const groupId = 5;

        const response = await request(app)
        .get(`/group/${groupId}/members`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(404);

        expect(response.body.message).toBe('No hay miembros en este grupo.');
    });
    test('Obtener Miembros de un Grupos de un Usuario', async () => 
        {
            const loginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcta"
            };
        
            const loginResponse = await request(app)
            .post('/auth/login')
            .send(loginUser)
            .expect('Content-Type', /json/)
            .expect(200);
        
            const token = loginResponse.body.accessToken;
    
            const Groupresponse = await request(app)
            .get('/group/')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const groupId = 2;
    
            const response = await request(app)
            .get(`/group/${groupId}/members`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);
    
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0]).toHaveProperty('username');
        });

    // (Editar Grupo)
    test('Editar un Grupo de un usuario', async () => 
    {
        const loginUser = {
            email: "Usuario1@ejemplo.com",
            password: "Correcta"
        };
    
        const loginResponse = await request(app)
            .post('/auth/login')
            .send(loginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
        const token = loginResponse.body.accessToken;

        const groupResponse = await request(app)
        .get('/group/')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

        const groupId = 5;

        const updatedGroup = {
            name: "Grupo Edotado",
            description: "Hello Word"
        };

        const response = await request(app)
        .put(`/group/${groupId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedGroup)
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.message).toBe('Grupo actualizado exitosamente.');
    });

    // (Eliminar Grupo)
    test('Eliminar un Grupo de un usuario', async () => 
    {
        const loginUser = {
            email: "Usuario1@ejemplo.com",
            password: "Correcta"
        };
    
        const loginResponse = await request(app)
            .post('/auth/login')
            .send(loginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
        const token = loginResponse.body.accessToken;

        const groupResponse = await request(app)
        .get('/group/')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

        const groupId = 3;

    const response = await request(app)
        .delete(`/group/${groupId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body.message).toBe('Grupo eliminado exitosamente.');
    });
});

describe('Pruebas de Software - Message', () => 
{
    // (Enviar Mensaje)
    test('Enviar un Mensaje', async () => 
    {
    });

    // (Obtener Mensaje)
    test('Obtener Mensajes de un Contacto', async () => 
    {
    });
    test('Obtener Mensajes de un Grupo', async () => 
    {
    });

    // (Eliminar Mensaje)
    test('Eliminar Mensajes de un Contacto', async () => 
    {
    });
});