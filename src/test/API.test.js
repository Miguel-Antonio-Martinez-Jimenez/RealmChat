const request = require('supertest');
const app = require('../../server');

describe(' Pruebas de Software - Auth ', () => 
{
    test('1. Register - Verificar todos los campos completos. (400)', async () => {
        const NewUser = 
        {
            username: "",
            email: "",
            phone_number: "",
            password: "",
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('Todos los campos son obligatorios.');
    });

    test('2. Register - Validar el formato del correo electronico. (400)', async () => {
        const NewUser = 
        {
            username: "Usuario1",
            email: "Usuario1",
            phone_number: "1234567890",
            password: "Correcto"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('Formato del correo electronico no valido.');
    });

    test('3. Register - Validar la contraseña sin mayusculas. (400)', async () => {
        const NewUser = 
        {
            username: "Usuario1",
            email: "Usuario1@ejemplo.com",
            phone_number: "1234567890",
            password: "correcto"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula.');
    });

    test('4. Register - Validar la contraseña sin minusculas. (400)', async () => {
        const NewUser = 
        {
            username: "Usuario1",
            email: "Usuario1@ejemplo.com",
            phone_number: "1234567890",
            password: "CORRECTO"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula.');
    });

    test('5. Register - Validar la contraseña menos de 6 caracteres. (400)', async () => {
        const NewUser = 
        {
            username: "Usuario1",
            email: "Usuario1@ejemplo.com",
            phone_number: "1234567890",
            password: "Corre"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula.');
    });

    test('6. Register - Registrar Usuario1. (201)', async () => {
        const NewUser = 
        {
            username: "Usuario1",
            email: "Usuario1@ejemplo.com",
            phone_number: "1234567890",
            password: "Correcto"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(201);
                        
        expect(response.body.message).toBe('Usuario registrado exitosamente.');
    });

    test('7. Register - Registrar Usuario2. (201)', async () => {
        const NewUser = 
        {
            username: "Usuario2",
            email: "Usuario2@ejemplo.com",
            phone_number: "0123456789",
            password: "Correcto"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(201);
                        
        expect(response.body.message).toBe('Usuario registrado exitosamente.');
    });

    test('8. Register - Registrar Usuario3. (201)', async () => {
        const NewUser = 
        {
            username: "Usuario3",
            email: "Usuario3@ejemplo.com",
            phone_number: "9876543210",
            password: "Correcto"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(201);
                        
        expect(response.body.message).toBe('Usuario registrado exitosamente.');
    });

    test('9. Register - Registrar Usuario1 ya existente. (409)', async () => {
        const NewUser = 
        {
            username: "Usuario1",
            email: "Usuario1@ejemplo.com",
            phone_number: "1234567890",
            password: "Correcto"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(409);
                        
        expect(response.body.message).toBe('El usuario con este Email ya existe.');
    });

    test('10. Register - Registrar Usuario2 ya existente. (409)', async () => {
        const NewUser = 
        {
            username: "Usuario2",
            email: "Usuario2@ejemplo.com",
            phone_number: "0123456789",
            password: "Correcto"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(409);
                        
        expect(response.body.message).toBe('El usuario con este Email ya existe.');
    });

    test('11. Register - Registrar Usuario3 ya existente. (409)', async () => {
        const NewUser = 
        {
            username: "Usuario3",
            email: "Usuario3@ejemplo.com",
            phone_number: "9876543210",
            password: "Correcto"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(409);
                        
        expect(response.body.message).toBe('El usuario con este Email ya existe.');
    });

    test('12. Login - Verificar todos los campos completos. (400)', async () => {
        const LoginUser = 
        {
            email: "",
            password: "",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('Todos los campos son obligatorios.');
    });

    test('13. Login - Validar el formato del email. (400)', async () => {
        const LoginUser = 
        {
            email: "Usuario1",
            password: "Correcto",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('Formato del correo electronico no valido.');
    });

    test('14. Login - Validar la contraseña sin mayusculas. (400)', async () => {
        const LoginUser = 
        {
            email: "Usuario1@ejemplo.com",
            password: "correcto",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula.');
    });

    test('15. Login - Validar la contraseña sin minusculas. (400)', async () => {
        const LoginUser = 
        {
            email: "Usuario1@ejemplo.com",
            password: "CORRECTO",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula.');
    });

    test('16. Register - Validar la contraseña menos de 6 caracteres. (400)', async () => {
        const LoginUser = 
        {
            email: "Usuario1@ejemplo.com",
            password: "Corre",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula.');
    });

    test('17. Login - Validar correo electronico incorrecto. (401)', async () => {
        const LoginUser = 
        {
            email: "Usuario0@ejemplo.com",
            password: "Correcto",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(401);
                        
        expect(response.body.message).toBe('Credenciales incorrectas, verifíquelas e inténtelo nuevamente.');
    });

    test('18. Login - Validar contraseña incorrecta. (401)', async () => {
        const LoginUser = 
        {
            email: "Usuario1@ejemplo.com",
            password: "Incorrecto",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(401);
                        
        expect(response.body.message).toBe('Credenciales incorrectas, verifíquelas e inténtelo nuevamente.');
    });

    test('19. Login - Iniciar Sesion con Usuario1. (200)', async () => {
        const LoginUser = 
        {
            email: "Usuario1@ejemplo.com",
            password: "Correcto",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);
                        
        expect(response.body.message).toBe('Has iniciado sesión correctamente.');
    });

    test('20. Login - Iniciar Sesion con Usuario2. (200)', async () => {
        const LoginUser = 
        {
            email: "Usuario2@ejemplo.com",
            password: "Correcto",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);
                        
        expect(response.body.message).toBe('Has iniciado sesión correctamente.');
    });

    test('21. Logout - Cerrar Sesion con Usuario1. (200)', async () => {
        const LoginUser = 
        {
            email: "Usuario1@ejemplo.com",
            password: "Correcto",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);
                        
        const token = loginResponse.body.accessToken;
                    
        const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
        expect(response.body.message).toBe('La sesión se completó con éxito.');
    });

    test('22. Logout - Cerrar Sesion con Usuario2. (200)', async () => {
        const LoginUser = 
        {
            email: "Usuario2@ejemplo.com",
            password: "Correcto",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);
                        
        const token = loginResponse.body.accessToken;
                    
        const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
        expect(response.body.message).toBe('La sesión se completó con éxito.');
    });
});

describe(' Pruebas de Software - Contact ', () => 
{
    test('1. Get - Contactos no encontrados. (404)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const response = await request(app)
            .get('/api/contact/')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    
            expect(response.body.message).toBe('No se encontraron contactos.');
                        
            const logout = await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: loginResponse.body.user.id })
            .expect('Content-Type', /json/)
            .expect(200);
    });
    
    test('2. Add - Validar el formato del correo electronico. (400)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const NewContact =
            {
                user_id: loginResponse.body.user.id,
                contact_email: "Usuario2"
            };
    
            const response = await request(app)
            .post('/api/contact/add')
            .set('Authorization', `Bearer ${token}`)
            .send(NewContact)
            .expect(400);
    
            expect(response.body.message).toBe('Formato del correo electronico no valido.');
    });
    
    test('3. Add - Contacto no encontrados. (404)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const NewContact =
            {
                user_id: loginResponse.body.user.id,
                contact_email: "Usuario0@ejemplo.com"
            };
    
            const response = await request(app)
            .post('/api/contact/add')
            .set('Authorization', `Bearer ${token}`)
            .send(NewContact)
            .expect(404);
    
            expect(response.body.message).toBe('Contacto no encontrado.');
                        
            const logout = await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: loginResponse.body.user.id })
            .expect('Content-Type', /json/)
            .expect(200);
    });
    
    test('4. Add - Agregar Usuario2 a contactos de Usuario1. (201)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const NewContact =
            {
                user_id: loginResponse.body.user.id,
                contact_email: "Usuario2@ejemplo.com"
            };
    
            const response = await request(app)
            .post('/api/contact/add')
            .set('Authorization', `Bearer ${token}`)
            .send(NewContact)
            .expect(201);
    
            expect(response.body.message).toBe('Contacto agregado exitosamente.');
                        
            const logout = await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: loginResponse.body.user.id })
            .expect('Content-Type', /json/)
            .expect(200);
    });
    
    test('5. Add - Agregar Usuario3 a contactos de Usuario1. (201)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const NewContact =
            {
                user_id: loginResponse.body.user.id,
                contact_email: "Usuario3@ejemplo.com"
            };
    
            const response = await request(app)
            .post('/api/contact/add')
            .set('Authorization', `Bearer ${token}`)
            .send(NewContact)
            .expect(201);
    
            expect(response.body.message).toBe('Contacto agregado exitosamente.');
                        
            const logout = await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: loginResponse.body.user.id })
            .expect('Content-Type', /json/)
            .expect(200);
    });
    
    test('6. Add - Agregar contacto ya registrado. (400)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const NewContact =
            {
                user_id: loginResponse.body.user.id,
                contact_email: "Usuario2@ejemplo.com"
            };
    
            const response = await request(app)
            .post('/api/contact/add')
            .set('Authorization', `Bearer ${token}`)
            .send(NewContact)
            .expect(400);
    
            expect(response.body.message).toBe('Este contacto ya está registrado.');
                        
            const logout = await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: loginResponse.body.user.id })
            .expect('Content-Type', /json/)
            .expect(200);
    });
    
    test('7. Get - Obtener todos los contactos. (200)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const response = await request(app)
            .get('/api/contact/')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    
            expect(response.body.message).toBe('Contactos encontrados.');
                        
            const logout = await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: loginResponse.body.user.id })
            .expect('Content-Type', /json/)
            .expect(200);
    });
    
    test('8. Delete - Validar el formato del correo electronico. (400)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const DeleteContact =
            {
                userId: loginResponse.body.user.id,
                contactEmail: "Usuario2"
            };
    
            const response = await request(app)
            .delete('/api/contact/')
            .set('Authorization', `Bearer ${token}`)
            .send(DeleteContact)
            .expect(400);
    
            expect(response.body.message).toBe('Formato del correo electronico no valido.');
    });
    
    test('9. Delete - Eliminar un contacto no existente. (404)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const DeleteContact =
            {
                userId: loginResponse.body.user.id,
                contactEmail: "Usuario0@ejemplo.com"
            };
    
            const response = await request(app)
            .delete('/api/contact/')
            .set('Authorization', `Bearer ${token}`)
            .send(DeleteContact)
            .expect(404);
    
            expect(response.body.message).toBe('El contacto no ha sido encontrado.');
                        
            const logout = await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: loginResponse.body.user.id })
            .expect('Content-Type', /json/)
            .expect(200);
    });
    
    test('10. Delete - Eliminar un contacto. (202)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const NewContact =
            {
                userId: loginResponse.body.user.id,
                contactEmail: "Usuario3@ejemplo.com"
            };
    
            const response = await request(app)
            .delete('/api/contact/')
            .set('Authorization', `Bearer ${token}`)
            .send(NewContact)
            .expect(200);
    
            expect(response.body.message).toBe('Contacto eliminado exitosamente.');
                        
            const logout = await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: loginResponse.body.user.id })
            .expect('Content-Type', /json/)
            .expect(200);
    });
});

describe(' Pruebas de Software - Group ', () => 
{
    test('1. Get - Obtener grupos no encontrados. (404)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const response = await request(app)
            .get('/api/group/')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    
            expect(response.body.message).toBe('No se encontraron grupos.');
    });
    
    test('2. Create - Verificar todos los campos completos. (400)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const newGroup = 
            {
                name: "",
                description: ""
            };
    
            const response = await request(app)
            .post('/api/group/create')
            .set('Authorization', `Bearer ${token}`)
            .send(newGroup)
            .expect(400);
    
            expect(response.body.message).toBe('El nombre y la descripcion del grupo son obligatorios.');
    });
    
    test('3. Create - Crear un grupo nuevo. (201)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const newGroup = 
            {
                name: "Nuevo Grupo1",
                description: "Hola a Todos!"
            };
    
            const response = await request(app)
            .post('/api/group/create')
            .set('Authorization', `Bearer ${token}`)
            .send(newGroup)
            .expect(201);
    
            expect(response.body.message).toBe('Grupo creado exitosamente.');
    });
    
    test('4. Get - Obtener grupos. (200)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const response = await request(app)
            .get('/api/group/')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    
            expect(response.body.message).toBe('Grupos obtenidos correctamente.');
    });
    
    test('5. Add - Verificar todos los campos completos. (400)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const newGroup = 
            {
                group_id: 1,
                email: ""
            };
    
            const response = await request(app)
            .post('/api/group/add-member')
            .set('Authorization', `Bearer ${token}`)
            .send(newGroup)
            .expect(400);
    
            expect(response.body.message).toBe('El correo electrónico es obligatorio.');
    });
    
    test('6. Add - Validar el formato del correo electronico. (400)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const newGroup = 
            {
                group_id: 1,
                email: "Usuario2"
            };
    
            const response = await request(app)
            .post('/api/group/add-member')
            .set('Authorization', `Bearer ${token}`)
            .send(newGroup)
            .expect(400);
    
            expect(response.body.message).toBe('Formato del correo electronico no valido.');
    });
    
    test('7. Add - Agregar un miembro externo al grupo. (404)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const NewMemberGroup = 
            {
                group_id: 1,
                email: "Usuario0@ejemplo.com"
            };
    
            const response = await request(app)
            .post('/api/group/add-member')
            .set('Authorization', `Bearer ${token}`)
            .send(NewMemberGroup)
            .expect(404);
    
            expect(response.body.message).toBe('No se encontró un usuario con este correo electrónico. ¿Deseas agregarlo como un usuario externo?');
    });
    
    test('8. Add - Agregar un contacto al grupo . (201)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
                                    
            const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const newGroup = 
            {
                group_id: 1,
                email: "Usuario2@ejemplo.com"
            };
    
            const response = await request(app)
            .post('/api/group/add-member')
            .set('Authorization', `Bearer ${token}`)
            .send(newGroup)
            .expect(201);
    
            expect(response.body.message).toBe('Miembro añadido al grupo exitosamente.');
    });
    
    test('9. Remove - Verificar todos los campos completos. (400)', async () => {
            const LoginUser = {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
    
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(LoginUser)
                .expect('Content-Type', /json/)
                .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const removeMember = {
                group_id: 1,
                email: ""
            };
    
            const response = await request(app)
                .post('/api/group/remove-member')
                .set('Authorization', `Bearer ${token}`)
                .send(removeMember)
                .expect(400);
    
            expect(response.body.message).toBe('El correo electrónico es obligatorio.');
    });
    
    test('10. Remove - Validar el formato del correo electronico. (400)', async () => {
            const LoginUser = {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
    
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(LoginUser)
                .expect('Content-Type', /json/)
                .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const removeMember = {
                group_id: 1,
                email: "Usuario2"
            };
    
            const response = await request(app)
                .post('/api/group/remove-member')
                .set('Authorization', `Bearer ${token}`)
                .send(removeMember)
                .expect(400);
    
            expect(response.body.message).toBe('Formato del correo electronico no valido.');
    });
    
    test('11. Remove - Eliminar un miembro no existente en el grupo. (404)', async () => {
            const LoginUser = {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
    
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(LoginUser)
                .expect('Content-Type', /json/)
                .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const removeMember = {
                group_id: 1,
                email: "Usuario0@ejemplo.com"
            };
    
            const response = await request(app)
                .post('/api/group/remove-member')
                .set('Authorization', `Bearer ${token}`)
                .send(removeMember)
                .expect(404);
    
            expect(response.body.message).toBe('No se encontró un usuario con este correo electrónico en el grupo.');
    });
    
    test('12. Remove - Eliminar un miembro del grupo. (200)', async () => {
            const LoginUser = {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
    
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(LoginUser)
                .expect('Content-Type', /json/)
                .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const removeMember = {
                group_id: 1,
                email: "Usuario2@ejemplo.com"
            };
    
            const response = await request(app)
                .post('/api/group/remove-member')
                .set('Authorization', `Bearer ${token}`)
                .send(removeMember)
                .expect(200);
    
            expect(response.body.message).toBe('Miembro eliminado del grupo exitosamente.');
    });
    
    test('13. Remove - Eliminar un miembro no existente en el grupo. (404)', async () => {
            const LoginUser = {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
    
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(LoginUser)
                .expect('Content-Type', /json/)
                .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const removeMember = {
                group_id: 1,
                email: "Usuario2@ejemplo.com"
            };
    
            const response = await request(app)
                .post('/api/group/remove-member')
                .set('Authorization', `Bearer ${token}`)
                .send(removeMember)
                .expect(404);
    
            expect(response.body.message).toBe('El usuario no es miembro del grupo.');
    });
    
    test('14. Edit - Verificar todos los campos completos. (400)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
    
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(LoginUser)
                .expect('Content-Type', /json/)
                .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const editGroup = 
            {
                group_id: 1,
                name: "",
                description: ""
            };
    
            const response = await request(app)
                .put('/api/group/edit')
                .set('Authorization', `Bearer ${token}`)
                .send(editGroup)
                .expect(400);
    
            expect(response.body.message).toBe('El nombre y la descripcion del grupo son obligatorios.');
    });
    
    test('15. Edit - Editar Grupo no encontrado. (404)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
    
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(LoginUser)
                .expect('Content-Type', /json/)
                .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const editGroup = 
            {
                group_id: 0,
                name: "Grupo Editado",
                description: "Hola Mundo!"
            };
    
            const response = await request(app)
                .put('/api/group/edit')
                .set('Authorization', `Bearer ${token}`)
                .send(editGroup)
                .expect(404);
    
            expect(response.body.message).toBe('Grupo no encontrado.');
    });
    
    test('16. Edit - Editar Grupo no encontrado. (200)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
    
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(LoginUser)
                .expect('Content-Type', /json/)
                .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const editGroup = 
            {
                group_id: 1,
                name: "Grupo Editado",
                description: "Hola Mundo!"
            };
    
            const response = await request(app)
                .put('/api/group/edit')
                .set('Authorization', `Bearer ${token}`)
                .send(editGroup)
                .expect(200);
    
            expect(response.body.message).toBe('Grupo editado exitosamente.');
    });
    
    test('17. Edit - Editar Grupo no encontrado. (200)', async () => {
            const LoginUser = 
            {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
    
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(LoginUser)
                .expect('Content-Type', /json/)
                .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const editGroup = 
            {
                group_id: 1,
                name: "Grupo Editado",
                description: "Hola Mundo!"
            };
    
            const response = await request(app)
                .put('/api/group/edit')
                .set('Authorization', `Bearer ${token}`)
                .send(editGroup)
                .expect(200);
    
            expect(response.body.message).toBe('Grupo editado exitosamente.');
    });
    
    test('18. Delete - Eliminar grupo no encontrado. (404)', async () => {
            const LoginUser = {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
    
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(LoginUser)
                .expect('Content-Type', /json/)
                .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const deleteGroup = {
                group_id: 0
            };
    
            const response = await request(app)
                .delete('/api/group/delete')
                .set('Authorization', `Bearer ${token}`)
                .send(deleteGroup)
                .expect(404);
    
            expect(response.body.message).toBe('Grupo no encontrado.');
    });
    
    test('19. Delete - Eliminar grupo sin permisos. (403)', async () => {
            const LoginUser = {
                email: "Usuario2@ejemplo.com",
                password: "Correcto",
            };
    
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(LoginUser)
                .expect('Content-Type', /json/)
                .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const deleteGroup = {
                group_id: 1
            };
    
            const response = await request(app)
                .delete('/api/group/delete')
                .set('Authorization', `Bearer ${token}`)
                .send(deleteGroup)
                .expect(403);
    
            expect(response.body.message).toBe('No tienes permisos para eliminar este grupo.');
    });

    test('20. Leave - Salir de un grupo. (200)', async () => {
        const LoginUser = {
            email: "Usuario1@ejemplo.com",
            password: "Correcto",
        };

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);

        const token = loginResponse.body.accessToken;

        const leaveGroup = {
            group_id: 1
        };

        const response = await request(app)
            .post('/api/group/leave')
            .set('Authorization', `Bearer ${token}`)
            .send(leaveGroup)
            .expect(200);

        expect(response.body.message).toBe('Has abandonado con éxito el grupo.');
    });
    
    test('21. Delete - Eliminar grupo. (200)', async () => {
            const LoginUser = {
                email: "Usuario1@ejemplo.com",
                password: "Correcto",
            };
    
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(LoginUser)
                .expect('Content-Type', /json/)
                .expect(200);
    
            const token = loginResponse.body.accessToken;
    
            const deleteGroup = {
                group_id: 1
            };
    
            const response = await request(app)
                .delete('/api/group/delete')
                .set('Authorization', `Bearer ${token}`)
                .send(deleteGroup)
                .expect(200);
    
            expect(response.body.message).toBe('Grupo y sus miembros eliminados exitosamente.');
    });
});