const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

const Finanzas = sequelize.define('Finanzas', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ingresos: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  egresos: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  deudas: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  abonos: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'finanzas',
  timestamps: true,
});

// Relación con usuario
Finanzas.belongsTo(User, { foreignKey: 'ID_usuario' });
User.hasMany(Finanzas, { foreignKey: 'ID_usuario' });

module.exports = Finanzas;