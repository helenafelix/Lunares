const { Sequelize } = require('sequelize');
const path = require('path');

// Configuração para SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'), // O arquivo vai pra na raiz do projeto
    logging: false
});

module.exports = sequelize;
