const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  mobileNumber: {
    type: DataTypes.STRING,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
  },
  gender: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  idProofType: {
    type: DataTypes.STRING,
  },
  idProofNumber: {
    type: DataTypes.STRING,
  },
  educationDetails: {
    type: DataTypes.TEXT,
  },
  resume: {
    type: DataTypes.STRING,
  },
  profilePicture: {
    type: DataTypes.STRING,
  },
  preferences: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: false,
  tableName: 'users'
});

module.exports = User;