const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const {Umzug, SequelizeStorage} = require('umzug')
const envVars = require('../config/config').default;
const pg = require('pg');

const config = {
  host: envVars[process.env.NODE_ENV].host,
  dialect: envVars[process.env.NODE_ENV].dialect,
  dialectModule: pg,
};

const sequelize = new Sequelize({
    database: envVars[process.env.NODE_ENV].database,
    username: envVars[process.env.NODE_ENV].username,
    password: envVars[process.env.NODE_ENV].password,
    ...config
  });
  
sequelize.authenticate()
.then(() => console.info('Connected to DB'))
.catch(e => console.error('Failed to connect to DB: ', e));

const User = require('./user.model')(sequelize, DataTypes);

const models = {
  User
};

Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

const db = { ...models, sequelize };

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const umzug = new Umzug({
  migrations: {glob: '/migrations/*.js'},
  storage: new SequelizeStorage({sequelize}),
});

(async () => {
  if (envVars.env !== 'test') {
    await umzug.up();
    console.info('All migrations performed successfully');
  }
})();

module.exports = db;
