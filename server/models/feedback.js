import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';
import Student from './student.js';

export default sequelize.define(
  'Feedback',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    feedbackBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: 'id',
      },
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: 'feedbacks', // Replace with the actual name of your table
    timestamps: false, // Remove this line if you have createdAt and updatedAt fields
  }
);
