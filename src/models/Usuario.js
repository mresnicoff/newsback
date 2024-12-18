// models/Usuario.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

 sequelize.define('usuario', {
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passhasheada: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  puedeescribir: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  linkautor: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tokenEmail: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
})};