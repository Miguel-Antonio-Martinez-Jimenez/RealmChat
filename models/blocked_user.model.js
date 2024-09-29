// ChatAPI/models/blocked_user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Users = require('./user.model');
const Contacts = require('./contact.model');

const BlockedUser = sequelize.define('blocked_users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  blocker_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  blocked_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,
  createdAt: 'blocked_at',
  updatedAt: false,
  freezeTableName: true,
});

// Actualización de la lógica al bloquear un usuario
BlockedUser.afterCreate(async (blockedUser, options) => {
  await Contacts.update({ is_blocked: true }, {
    where: {
      user_id: blockedUser.blocker_id,
      contact_id: blockedUser.blocked_id,
    },
  });
});

module.exports = BlockedUser;