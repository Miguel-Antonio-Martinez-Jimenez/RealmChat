const request = require('supertest');
const app = require('../../server');

/*
    USUARIO 1
    username: Miguel_30
    email: usuario0@ejemplo.com
    phone number: 1234567890
    password: C0rrect@

    USUARIO 2
    username: Johan_01
    email: usuario1@ejemplo.com
    phone number: 0987654321
    password: C0rrect@

    USUARIO 3
    username: Marco_07
    email: usuario2@ejemplo.com
    phone number: 5432109876
    password: C0rrect@
*/

describe(' Pruebas de Software - Auth ', () => {
    test('1. Register - Validar todos los campos completos. (400)', async () => {
        const NewUser = 
        {
            username: "",
            email: "",
            phone_number: "",
            password: ""
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('Todos los campos son obligatorios.');
    });
    test('2. Register - Validar el formato del nombre del usuario. (400)', async () => {
        const NewUser = 
        {
            username: ".Miguel",
            email: "usuario0@ejemplo.com",
            phone_number: "1234567890",
            password: "C0rrect@"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('Nombre de usuario no válido. Debe tener entre 5 y 15 caracteres, solo letras, números, puntos o guion bajo, sin caracteres especiales al inicio o final, y sin puntos ni guiones bajos consecutivos.');
    });
    test('3. Register - Validar el formato del correo electronico. (400)', async () => {
        const NewUser = 
        {
            username: "Miguel_30",
            email: "usuario0",
            phone_number: "1234567890",
            password: "C0rrect@"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('Formato del correo electrónico no válido.');
    });
    test('4. Register - Validar el formato del numero de telefono. (400)', async () => {
        const NewUser = 
        {
            username: "Miguel_30",
            email: "usuario0@ejemplo.com",
            phone_number: "123456789",
            password: "C0rrect@"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('Formato del número de teléfono no válido. Debe ser exactamente de 10 dígitos.');
    });
    test('5. Register - Validar la contraseña sin mayusculas. (400)', async () => {
        const NewUser = 
        {
            username: "Miguel_30",
            email: "usuario0@ejemplo.com",
            phone_number: "1234567890",
            password: "c0rrect@"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.');
    });
    test('6. Register - Validar la contraseña sin minuscula. (400)', async () => {
        const NewUser = 
        {
            username: "Miguel_30",
            email: "usuario0@ejemplo.com",
            phone_number: "1234567890",
            password: "C0RRECT@"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.');
    });
    test('7. Register - Validar la contraseña sin caracteres especiales. (400)', async () => {
        const NewUser = 
        {
            username: "Miguel_30",
            email: "usuario0@ejemplo.com",
            phone_number: "1234567890",
            password: "C0rrecto"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.');
    });
    test('8. Register - Validar la contraseña sin digitos. (400)', async () => {
        const NewUser = 
        {
            username: "Miguel_30",
            email: "usuario0@ejemplo.com",
            phone_number: "1234567890",
            password: "Correct@"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.');
    });
    test('9. Register - Validar la contraseña menos de 6 caracteres. (400)', async () => {
        const NewUser = 
        {
            username: "Miguel_30",
            email: "usuario0@ejemplo.com",
            phone_number: "1234567890",
            password: "C0rr*"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.');
    });
    test('10. Register - Registrar un usuario nuevo. (201)', async () => {
        const NewUser = 
        {
            username: "Miguel_30",
            email: "usuario0@ejemplo.com",
            phone_number: "1234567890",
            password: "C0rrect@"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(201);
                        
        expect(response.body.message).toBe('Usuario registrado exitosamente.');
    });
    test('11. Register - Registrar un usuario nuevo. (201)', async () => {
        const NewUser = 
        {
            username: "Johan_01",
            email: "usuario1@ejemplo.com",
            phone_number: "0987654321",
            password: "C0rrect@"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(201);
                        
        expect(response.body.message).toBe('Usuario registrado exitosamente.');
    });
    test('12. Register - Registrar un usuario nuevo. (201)', async () => {
        const NewUser = 
        {
            username: "Marco_07",
            email: "usuario2@ejemplo.com",
            phone_number: "5432109876",
            password: "C0rrect@"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(201);
                        
        expect(response.body.message).toBe('Usuario registrado exitosamente.');
    });
    test('13. Register - Registrar un usuario con email existente. (209)', async () => {
        const NewUser = 
        {
            username: "Miguel_30",
            email: "usuario0@ejemplo.com",
            phone_number: "1234567890",
            password: "C0rrect@"
        };
                                
        const response = await request(app)
        .post('/api/auth/register')
        .send(NewUser)
        .expect('Content-Type', /json/)
        .expect(409);
                        
        expect(response.body.message).toBe('El usuario con este correo electrónico ya existe.');
    });
    test('14. Login - Validar todos los campos completos. (400)', async () => {
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
    test('15. Login - Validar el formato del correo electronico. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0",
            password: "C0rrect@",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('Formato del correo electronico no valido.');
    });
    test('16. Login - Validar la contraseña sin mayusculas. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "c0rrect@"
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula.');
    });
    test('17. Login - Validar la contraseña sin minuscula. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0RRECT@",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula.');
    });
    test('18. Login - Validar la contraseña sin caracteres especiales. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrecto",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula.');
    });
    test('19. Login - Validar la contraseña sin digitos. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "Correct@",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula.');
    });
    test('20. Login - Validar la contraseña menos de 6 caracteres. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rr*",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(400);
                        
        expect(response.body.message).toBe('La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula y una letra minúscula.');
    });
    test('21. Login - Validar el correo electronico incorrecto. (401)', async () => {
        const LoginUser = 
        {
            email: "usuario@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(401);
                        
        expect(response.body.message).toBe('Credenciales incorrectas, verifíquelas e inténtelo nuevamente.');
    });
    test('22. Login - Validar la contraseña incorrecta. (401)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "Inc0rrect@",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(401);
                        
        expect(response.body.message).toBe('Credenciales incorrectas, verifíquelas e inténtelo nuevamente.');
    });
    test('23. Login - Iniciar sesion con un usuario existente. (200)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const response = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);
                        
        expect(response.body.message).toBe('Has iniciado sesión correctamente.');
    });
    test('24. Logout - Cerrar Sesion de un usuario existente. (200)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
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

describe(' Pruebas de Software - Contact ', () => {
    test('1. Get - Obtener contactos no encontrados de un usuario existente. (404)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
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
    test('2. Add - Validar todos los campos completos. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewContact =
        {
            contact_email: ""
        };

        const response = await request(app)
        .post('/api/contact/add')
        .set('Authorization', `Bearer ${token}`)
        .send(NewContact)
        .expect(400);

        expect(response.body.message).toBe('El campo Email es obligatorio.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('3. Add - Validar el formato del correo electronico. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewContact =
        {
            contact_email: "usuario1"
        };

        const response = await request(app)
        .post('/api/contact/add')
        .set('Authorization', `Bearer ${token}`)
        .send(NewContact)
        .expect(400);

        expect(response.body.message).toBe('Formato del correo electrónico no válido.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('4. Add - Agregar un contacto(usuario) no existente. (404)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewContact =
        {
            contact_email: "usuario@ejemplo.com"
        };

        const response = await request(app)
        .post('/api/contact/add')
        .set('Authorization', `Bearer ${token}`)
        .send(NewContact)
        .expect(404);

        expect(response.body.message).toBe('Usuario no encontrado.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('5. Add - Agregar un contacto(usuario). (201)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewContact =
        {
            contact_email: "usuario1@ejemplo.com"
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
    test('6. Add - Agregar un contacto(usuario). (201)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewContact =
        {
            contact_email: "usuario2@ejemplo.com"
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
    test('7. Add - Agregar un contacto(usuario) ya existente. (404)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewContact =
        {
            contact_email: "usuario1@ejemplo.com"
        };

        const response = await request(app)
        .post('/api/contact/add')
        .set('Authorization', `Bearer ${token}`)
        .send(NewContact)
        .expect(400);

        expect(response.body.message).toBe('Este usuario ya existe entre tus contactos.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('8. Get - Obtener contactos de un usuario existente. (200)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
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
    test('9. Delete - Validar todos los campos completos. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewContact =
        {
            contact_email: ""
        };

        const response = await request(app)
        .delete('/api/contact/')
        .set('Authorization', `Bearer ${token}`)
        .send(NewContact)
        .expect(400);

        expect(response.body.message).toBe('El campo Email es obligatorios.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('10. Delete - Validar el formato del correo electronico. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewContact =
        {
            contact_email: "usuario2"
        };

        const response = await request(app)
        .delete('/api/contact/')
        .set('Authorization', `Bearer ${token}`)
        .send(NewContact)
        .expect(400);

        expect(response.body.message).toBe('Formato del correo electronico no valido.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('11. Delete - Eliminar un contacto de un usuario. (200)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewContact =
        {
            contact_email: "usuario2@ejemplo.com"
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
    test('12. Delete - Eliminar un contacto no existente de un usuario. (404)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewContact =
        {
            contact_email: "usuario2@ejemplo.com"
        };

        const response = await request(app)
        .delete('/api/contact/')
        .set('Authorization', `Bearer ${token}`)
        .send(NewContact)
        .expect(404);

        expect(response.body.message).toBe('El contacto no ha sido encontrado.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

describe(' Pruebas de Software - group ', () => {
    test('1. Get - Obtener grupos no encontrados de un usuario existente. (404)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
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

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('2. Create - Validar todos los campos completos. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewGroup = 
        {
            name: "",
            description: ""
        };

        const response = await request(app)
        .post('/api/group/create')
        .set('Authorization', `Bearer ${token}`)
        .send(NewGroup)
        .expect(400);

        expect(response.body.message).toBe('El nombre y la descripción del grupo son obligatorios.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('3. Create - Crear un grupo nuevo. (201)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewGroup = 
        {
            name: "Grupo de Prueba",
            description: "Hola al grupo del API"
        };

        const response = await request(app)
        .post('/api/group/create')
        .set('Authorization', `Bearer ${token}`)
        .send(NewGroup)
        .expect(201);

        expect(response.body.message).toBe('Grupo creado exitosamente.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('4. Create - Crear un grupo nuevo. (201)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewGroup = 
        {
            name: "Grupo Malo",
            description: "Hola Mundo - API"
        };

        const response = await request(app)
        .post('/api/group/create')
        .set('Authorization', `Bearer ${token}`)
        .send(NewGroup)
        .expect(201);

        expect(response.body.message).toBe('Grupo creado exitosamente.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('5. Create - Crear un grupo con nombre ya existente. (409)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const NewGroup = 
        {
            name: "Grupo de Prueba",
            description: "Hola al grupo del API"
        };

        const response = await request(app)
        .post('/api/group/create')
        .set('Authorization', `Bearer ${token}`)
        .send(NewGroup)
        .expect(409);

        expect(response.body.message).toBe('Ya existe un grupo con el mismo nombre.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('6. Get - Obtener grupos de un usuario existente. (200)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
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

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('7. Add - Validar todos los campos completos. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const Group = 
        {
            group_id: 1,
            email: ""
        };
    
        const response = await request(app)
        .post('/api/group/add-member')
        .send(Group)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
                        
        expect(response.body.message).toBe('El correo electrónico es obligatorio.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('8. Add - Validar el formato del correo electronico. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const Group = 
        {
            group_id: 1,
            email: "usuario1"
        };
    
        const response = await request(app)
        .post('/api/group/add-member')
        .send(Group)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
                        
        expect(response.body.message).toBe('Formato del correo electronico no valido.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('9. Add - Agregar un usuario no existente. (404)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const Group = 
        {
            group_id: 1,
            email: "usuario@ejemplo.com"
        };
    
        const response = await request(app)
        .post('/api/group/add-member')
        .send(Group)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
                        
        expect(response.body.message).toBe('No se encontró un usuario con este correo electrónico.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('10. Add - Agregar un usuario existente. (201)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const Group = 
        {
            group_id: 1,
            email: "usuario1@ejemplo.com"
        };
    
        const response = await request(app)
        .post('/api/group/add-member')
        .send(Group)
        .set('Authorization', `Bearer ${token}`)
        .expect(201);
                        
        expect(response.body.message).toBe('Miembro añadido al grupo exitosamente.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('11. Add - Agregar un usuario existente. (201)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const Group = 
        {
            group_id: 1,
            email: "usuario2@ejemplo.com"
        };
    
        const response = await request(app)
        .post('/api/group/add-member')
        .send(Group)
        .set('Authorization', `Bearer ${token}`)
        .expect(201);
                        
        expect(response.body.message).toBe('Miembro añadido al grupo exitosamente.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('12. Remove - Verificar todos los campos completos. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
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

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('13. Remove - Validar el formato del correo electronico. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);

        const token = loginResponse.body.accessToken;

        const removeMember = {
            group_id: 1,
            email: "usuario1"
        };

        const response = await request(app)
            .post('/api/group/remove-member')
            .set('Authorization', `Bearer ${token}`)
            .send(removeMember)
            .expect(400);

        expect(response.body.message).toBe('Formato del correo electronico no valido.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('14. Remove - Eliminar un miembro no existente. (404)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);

        const token = loginResponse.body.accessToken;

        const removeMember = {
            group_id: 1,
            email: "usuario@ejemplo.com"
        };

        const response = await request(app)
            .post('/api/group/remove-member')
            .set('Authorization', `Bearer ${token}`)
            .send(removeMember)
            .expect(404);

        expect(response.body.message).toBe('No se encontró un usuario con este correo electrónico en el grupo.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('15. Remove - Eliminar un miembro de un grupo. (200)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);

        const token = loginResponse.body.accessToken;

        const removeMember = {
            group_id: 1,
            email: "usuario1@ejemplo.com"
        };

        const response = await request(app)
            .post('/api/group/remove-member')
            .set('Authorization', `Bearer ${token}`)
            .send(removeMember)
            .expect(200);

        expect(response.body.message).toBe('Miembro eliminado del grupo exitosamente.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('16. Remove - Eliminar un miembro no agregado de un grupo. (200)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);

        const token = loginResponse.body.accessToken;

        const removeMember = {
            group_id: 1,
            email: "usuario1@ejemplo.com"
        };

        const response = await request(app)
            .post('/api/group/remove-member')
            .set('Authorization', `Bearer ${token}`)
            .send(removeMember)
            .expect(404);

        expect(response.body.message).toBe('El usuario no es miembro del grupo.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('17. Edit - Validar todos los campos completos. (400)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const EditGroup = 
        {
            group_id: 1,
            name: "",
            description: ""
        };
    
        const response = await request(app)
        .put('/api/group/edit')
        .send(EditGroup)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
                        
        expect(response.body.message).toBe('El nombre y la descripcion del grupo son obligatorios.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('18. Edit - Editar un grupo no existente. (404)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const EditGroup = 
        {
            group_id: 0,
            name: "Grupo de Prueba",
            description: "Esta es un Grupo Editado - API"
        };
    
        const response = await request(app)
        .put('/api/group/edit')
        .send(EditGroup)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
                        
        expect(response.body.message).toBe('Grupo no encontrado.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('19. Edit - Editar un grupo. (200)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };
                                
        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const EditGroup = 
        {
            group_id: 1,
            name: "Grupo de Prueba",
            description: "Esta es un Grupo Editado - API"
        };
    
        const response = await request(app)
        .put('/api/group/edit')
        .send(EditGroup)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
                        
        expect(response.body.message).toBe('Grupo editado exitosamente.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('20. Delete - Eliminar grupo no encontrado. (404)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);

        const token = loginResponse.body.accessToken;

        const DeleteGroup = {
            group_id: 0
        };

        const response = await request(app)
        .delete('/api/group/delete')
        .set('Authorization', `Bearer ${token}`)
        .send(DeleteGroup)
        .expect(404);

        expect(response.body.message).toBe('Grupo no encontrado.');
        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('21. Delete - Eliminar grupo sin permisos. (403)', async () => {
        const LoginUser = 
        {
            email: "usuario2@ejemplo.com",
            password: "C0rrect@",
        };

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);

        const token = loginResponse.body.accessToken;

        const DeleteGroup = {
            group_id: 2
        };

        const response = await request(app)
            .delete('/api/group/delete')
            .set('Authorization', `Bearer ${token}`)
            .send(DeleteGroup)
            .expect(403);

        expect(response.body.message).toBe('No tienes permisos para eliminar este grupo.');
        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('22. Delete - Eliminar grupo. (200)', async () => {
        const LoginUser = 
        {
            email: "usuario0@ejemplo.com",
            password: "C0rrect@",
        };

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(LoginUser)
            .expect('Content-Type', /json/)
            .expect(200);

        const token = loginResponse.body.accessToken;

        const DeleteGroup = {
            group_id: 2
        };

        const response = await request(app)
        .delete('/api/group/delete')
        .set('Authorization', `Bearer ${token}`)
        .send(DeleteGroup)
        .expect(200);

        expect(response.body.message).toBe('Grupo y sus miembros eliminados exitosamente.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('23. Leave - Salir de un grupo no existente. (404)', async () => {
        const LoginUser = 
        {
            email: "usuario2@ejemplo.com",
            password: "C0rrect@",
        };

        const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(LoginUser)
        .expect('Content-Type', /json/)
        .expect(200);

        const token = loginResponse.body.accessToken;

        const leaveGroup = {
            group_id: 0
        };

        const response = await request(app)
        .post('/api/group/leave')
        .set('Authorization', `Bearer ${token}`)
        .send(leaveGroup)
        .expect(404);

        expect(response.body.message).toBe('El usuario no es miembro del grupo.');

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('24. Leave - Salir de un grupo. (200)', async () => {
        const LoginUser = 
        {
            email: "usuario2@ejemplo.com",
            password: "C0rrect@",
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

        const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: loginResponse.body.user.id })
        .expect('Content-Type', /json/)
        .expect(200);
    });
})