const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
  tableName: 'notes'
});

Note.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Note;