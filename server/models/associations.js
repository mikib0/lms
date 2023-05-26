import Feedback from './feedback.js';
import Student from './student.js';
import Order from './order.js';

Feedback.belongsTo(Student, {
  foreignKey: 'feedbackBy',
  onDelete: 'CASCADE',
});
Student.hasMany(Feedback, {
  foreignKey: 'feedbackBy',
  onDelete: 'CASCADE',
});

Order.belongsTo(Student, { foreignKey: 'orderedBy', onDelete: 'CASCADE' });
Student.hasMany(Order, { foreignKey: 'orderedBy', onDelete: 'CASCADE' });
