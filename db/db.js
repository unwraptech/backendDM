const Sequelize = require('sequelize');
const config = require('config').db;
const models = require('./models');

const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: config.pool
});

db.sync(
// {  force: true}
);
db.models = models;

module.exports = db;