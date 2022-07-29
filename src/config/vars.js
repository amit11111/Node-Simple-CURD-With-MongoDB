const path = require('path');

// import .env variables
require('dotenv-safe').config({
  allowEmptyValues: true,
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

const dbConfig = require(`${global.appRoot}/src/config/envSetup/db`);

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  appLog: (process.env.APP_LOG === 'true' || process.env.APP_LOG === '1' || process.env.APP_LOG === 1),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongoDBConnections: [
    {
      uri: dbConfig.mongoDbConnection,
      name: 'mongoDbConnection',
      default: true,
    },
  ],
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
  serviceName: process.env.SERVICE_NAME,
};
