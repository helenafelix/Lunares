const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    matricula: {
        type: DataTypes.STRING(30),
        allowNull: true,
        unique: true
    },

    senha: {
        type: DataTypes.STRING(225),
        allowNull: false
    },

    perfil: {
        type: DataTypes.ENUM('Admin/Gestão', 'Professor/Docente', 'Aluno/Discente'),
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Usuario;