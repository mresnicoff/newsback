// models/Noticia.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

 sequelize.define('noticia', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'noticias',
  timestamps: false,
})};


