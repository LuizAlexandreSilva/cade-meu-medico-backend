const { DataTypes } = require('sequelize');

const { sequelize } = require('../index');

const Pessoa = sequelize.define('Pessoa', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnes: {
    type: DataTypes.STRING,
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false, // nao cria colunas createdAt e updatedAt
});

module.exports = { Pessoa };