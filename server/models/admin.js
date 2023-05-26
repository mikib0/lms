import { DataTypes, STRING } from 'sequelize';
import sequelize from './sequelize.js';

export default sequelize.define(
  'Admin',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.CHAR(60),
      allowNull: false
    },
  },
  {
    tableName: 'admins',
    timestamps: false,
  }
);