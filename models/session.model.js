// ChatAPI/models/session.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Users = require('./user.model');

const UserSession = sequelize.define('user_sessions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
  },
  device_info: {
    type: DataTypes.STRING(255),
  },
  session_token: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  freezeTableName: true,
});

module.exports = UserSession;