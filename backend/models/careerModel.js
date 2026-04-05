const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Career = sequelize.define('Career', {
  interests: {
    type: DataTypes.TEXT,
  },
  skills: {
    type: DataTypes.TEXT,
  },
  predicted_career: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  tableName: 'careers'
});

Career.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Career;