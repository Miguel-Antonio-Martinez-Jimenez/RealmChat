// ChatAPI/models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(20),
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status_message: {
    type: DataTypes.STRING(255),
    defaultValue: 'Hey there! I am using this chat app',
  },
  last_seen: {
    type: DataTypes.DATE,
  },
  is_online: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  refresh_token: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  freezeTableName: true,
});

module.exports = User;
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
// ChatAPI/models/notification.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Users = require('./user.model');
const Messages = require('./message.model');

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
  },
  message_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Messages,
      key: 'id',
    },
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
  updatedAt: false, // No se actualiza al leer
  freezeTableName: true,
});

module.exports = Notification;
// ChatAPI/models/message.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Users = require('./user.model');
const Groups = require('./group.model');

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
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
  },
  group_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Groups,
      key: 'id',
    },
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
  updatedAt: false, // No se actualiza una vez enviado
  freezeTableName: true,
  validate: {
    eitherReceiverOrGroup() {
      if (!this.receiver_id && !this.group_id) {
        throw new Error('Message must have a receiver or a group.');
      }
    }
  }
});

module.exports = Message;
// ChatAPI/models/group.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Users = require('./user.model');

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
      model: Users,
      key: 'id',
    },
  },
  group_picture: {
    type: DataTypes.STRING(255),
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  freezeTableName: true,
});

module.exports = Group;
// ChatAPI/models/group_members.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Users = require('./user.model');
const Groups = require('./user.model');

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
      model: Groups,
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  createdAt: 'joined_at',
  updatedAt: false,
  freezeTableName: true,
});

module.exports = GroupMember;
// ChatAPI/models/blocked_user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Users = require('./user.model');

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
  },
  blocked_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  createdAt: 'blocked_at',
  updatedAt: false,
  freezeTableName: true,
});

module.exports = BlockedUser;