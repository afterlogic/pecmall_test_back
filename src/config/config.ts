import path from 'path';
import Joi from 'joi';
import dotenv from 'dotenv';

// export default function loadConfig(): void {
  const envPath = path.join(__dirname, '..', '..', '.env');

  const result = dotenv.config({ path: envPath });

  if (result.error) {
    throw new Error(
      `Failed to load .env file from path ${envPath}: ${result.error.message}`,
    );
  }

  const schema = Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'testing', 'production')
      .required(),
    LOG_LEVEL: Joi.string()
      .valid('debug', 'info', 'warn', 'error', 'fatal')
      .required(),
    API_HOST: Joi.string().required(),
    API_PORT: Joi.string().required(),
    APP_JWT_SECRET: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    SMTP_HOST: Joi.string().required(),
    SMTP_PORT: Joi.string().required(),
    SMTP_USER: Joi.string().required().allow(''),
    SMTP_PASSWORD: Joi.string().required().allow(''),
    SMTP_SECURE: Joi.boolean().required(),
  }).unknown(true);

  const { value: envVars, error } = schema.prefs({ errors: { label: 'key' } }).validate(process.env, { abortEarly: false });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
// }


export default {
  env: envVars.NODE_ENV,
  port: envVars.API_PORT,
  host: envVars.API_HOST,
  logLevel: envVars.LOG_LEVEL,
  umzug: envVars.UMZUG,
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
  jwt: {
    secret: envVars.APP_JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  smtp: {
    host: envVars.SMTP_HOST,
    port: envVars.SMTP_PORT,
    user: envVars.SMTP_USER,
    pass: envVars.SMTP_PASSWORD,
    secure: envVars.SMTP_SECURE
  }
};