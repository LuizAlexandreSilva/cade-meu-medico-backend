const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:') // Banco em memória
// const queryInterface = sequelize.getQueryInterface();

// queryInterface.createTable('Locais', {
//   id: DataTypes.INTEGER,
//   nome: DataTypes.STRING,
// });

// queryInterface.createTable('Pessoas', {
//   id: DataTypes.INTEGER,
//   nome: DataTypes.STRING,
//   id_local: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'Locais',
//       key: 'id',
//     },
//     onUpdate: 'cascade',
//     onDelete: 'cascade',
//   }
// });

module.exports = { sequelize };
