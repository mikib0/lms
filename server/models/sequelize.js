import Sequelize from 'sequelize';

export default new Sequelize('lmsdb', 'saleem', 'tilde00', {
  host: 'localhost',
  dialect: 'mysql',
});
