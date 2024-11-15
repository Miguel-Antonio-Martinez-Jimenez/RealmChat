const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db.config');
const authRoutes = require('./src/routes/auth.routes');
const contactRoutes = require('./src/routes/contact.routes');
const groupRoutes = require('./src/routes/group.routes');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/group', groupRoutes);


sequelize.sync({ force: false })
.then(() => 
{
    console.log('Tablas sincronizadas...');
    require('./src/models/user.model').sync();
    require('./src/models/contact.model').sync();
    require('./src/models/group.model').sync();
    require('./src/models/group_members.model').sync();
    require('./src/models/message.model').sync();
    require('./src/models/notification.model').sync();
})
.catch((error) => 
{
    console.error('Error al sincronizar con MySQL: ', error);
});

app.get('/api', (req, res) => 
{
    res.send('¡Bienvenido a la API de Chat!');
});
    
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => 
{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
    
module.exports = app;