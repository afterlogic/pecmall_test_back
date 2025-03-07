const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'stage', 'test').required(),
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string(),
    DB_NAME: Joi.string(),
    DB_USER: Joi.string(),
    DB_PWD: Joi.string(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  development: {
    username: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    dialect: 'postgres',
    logging: false
  },
  stage: {
    username: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME,
    port: envVars.DB_PORT,
    host: envVars.DB_HOST,
    dialect: 'postgres',
    logging: false
  },
};
