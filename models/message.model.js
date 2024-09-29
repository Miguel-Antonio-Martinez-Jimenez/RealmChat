// ChatAPI/models/message.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Users = require('./user.model');
const Groups = require('./group.model');
const Contacts = require('./contact.model');

const Message = sequelize.define('messages', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  group_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Groups,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  freezeTableName: true,
  validate: {
    eitherReceiverOrGroup() {
      if (!this.receiver_id && !this.group_id) {
        throw new Error('Message must have a receiver or a group.');
      }
    },
    async isContact() {
      if (this.receiver_id) {
        const contact = await Contacts.findOne({
          where: {
            user_id: this.sender_id,
            contact_id: this.receiver_id,
          },
        });
        if (!contact) {
          throw new Error('You can only message your contacts.');
        }
      }
    }
  }
});

module.exports = Message;