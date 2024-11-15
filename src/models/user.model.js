const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('users', 
{
  id: 
  {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: 
  {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  email: 
  {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  password: 
  {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone_number: 
  {
    type: DataTypes.STRING(20),
    unique: true,
  },
  status_message: 
  {
    type: DataTypes.STRING(255),
    defaultValue: 'Hello! I am using chat API.',
  },
  last_seen: 
  {
    type: DataTypes.DATE,
  },
  is_online: 
  {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  refresh_token: 
  {
    type: DataTypes.TEXT,
  },
}, 
{
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  freezeTableName: true,
});

(async () => { await sequelize.sync(); })();

module.exports = User;