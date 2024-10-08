const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./user.model');

const Contact = sequelize.define('contacts', 
{
    id: 
    {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: 
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: 
        {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    contact_id: 
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: 
        {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    is_blocked: 
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, 
{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

Contact.belongsTo(User, { foreignKey: 'contact_id', as: 'contact' });

(async () => { await sequelize.sync(); })();

module.exports = Contact;