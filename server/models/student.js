import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

export default sequelize.define(
  'Student',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(11),
    },
    gender: {
      type: DataTypes.STRING(6),
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    department: {
      type: DataTypes.STRING(50),
    },
    hostel: {
      type: DataTypes.STRING(50),
    },
    level: {
      type: DataTypes.INTEGER,
    },
    room: {
      type: DataTypes.STRING(4),
    },
    dormAdvisor: {
      type: DataTypes.STRING(50),
    },
    profileImage: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.CHAR(60),
      allowNull: false,
    },
  },
  {
    tableName: 'students',
    timestamps: false,
  }
);