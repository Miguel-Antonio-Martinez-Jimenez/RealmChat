// ChatAPI/models/group_member.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Group = require('./group.model');
const User = require('./user.model');
const Contacts = require('./contact.model');

const GroupMember = sequelize.define('group_members', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Group,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  added_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,
  createdAt: 'added_at',
  updatedAt: false,
  freezeTableName: true,
  validate: {
    async isContact() {
      const contact = await Contacts.findOne({
        where: {
          user_id: this.added_by,
          contact_id: this.user_id,
        },
      });
      if (!contact) {
        throw new Error('You can only add your contacts to a group.');
      }
    }
  }
});
GroupMember.belongsTo(Group, { foreignKey: 'group_id' });
GroupMember.belongsTo(User, { foreignKey: 'user_id' });
module.exports = GroupMember;