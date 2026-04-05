const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Planner = sequelize.define('Planner', {
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  time: {
    type: DataTypes.TIME,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
  tableName: 'planners'
});

Planner.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Planner;