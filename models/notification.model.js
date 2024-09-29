// ChatAPI/models/notification.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Users = require('./user.model');
const Messages = require('./message.model');
const Contacts = require('./contact.model');

const Notification = sequelize.define('notifications', {
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
    onDelete: 'CASCADE',
  },
  message_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Messages,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  notification_text: {
    type: DataTypes.STRING(255),
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  freezeTableName: true,
  validate: {
    async isContact() {
      const message = await Messages.findByPk(this.message_id);
      if (message.receiver_id) {
        const contact = await Contacts.findOne({
          where: {
            user_id: message.receiver_id,
            contact_id: this.user_id,
          },
        });
        if (!contact) {
          throw new Error('Notifications can only be sent to contacts.');
        }
      }
    }
  }
});

module.exports = Notification;