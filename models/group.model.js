// ChatAPI/models/group.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./user.model');

const Group = sequelize.define('groups', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  freezeTableName: true,
});
Group.belongsTo(User, { foreignKey: 'admin_id', as: 'admin' });
(async () => {
  await sequelize.sync();
})();

module.exports = Group;