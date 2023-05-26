import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';
import Student from './student.js';

export default sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    shirts: {
      type: DataTypes.INTEGER,
    },
    trousers: {
      type: DataTypes.INTEGER,
    },
    underwears: {
      type: DataTypes.INTEGER,
    },
    staff: {
      type: DataTypes.STRING(50),
    },
    instructions: {
      type: DataTypes.STRING(500),
    },
  },
  {
    tableName: 'orders',
    timestamps: false,
  }
);
