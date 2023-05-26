import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

export default sequelize.define('LostButFound', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  src: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'lostbutfounds',
  timestamps: false
});