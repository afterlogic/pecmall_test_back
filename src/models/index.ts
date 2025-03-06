import { DataTypes }  from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import pg from 'pg';

import path from'path';

import envVars  from '../config/config';
// const logger = require('../config/logger');

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

const db = { ...models, sequelize: sequelize, Sequelize: Sequelize };

// db.sequelize = sequelize;

// const umzug = new Umzug({
//   migrations: {
//     path: path.join(__dirname, '../migrations'),
//     params: [sequelize.getQueryInterface()]
//   },
//   storage: 'sequelize',
//   storageOptions: {
//     sequelize
//   }
// });

(async () => {
  if (envVars.umzug !== 'false') {
    // await umzug.up();
    console.info('All migrations performed successfully');
  }
})();

export default db;
