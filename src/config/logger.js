const winston = require('winston');
const { Mail } = require('winston-mail');

const transports = [];

transports.push(new winston.transports.File({ filename: 'error.log', level: 'error' }));
transports.push(new winston.transports.File({ filename: 'combined.log' }));

if (process.env.NODE_ENV === 'production') {
  transports.push(new winston.transports.Console({
    json: true,
    colorize: true,
    handleException: true,
  }));
}

if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  const environment = require(`${global.appRoot}/src/config/envSetup/${process.env.NODE_ENV}`); // eslint-disable-line
  const mailTransport = new Mail(
    environment.smtpErrorConfig,
  );
  transports.push(mailTransport);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports,
  // transports: [
  //
  // - Write to all logs with level `info` and below to `combined.log`
  // - Write all logs error (and below) to `error.log`.
  //
  // new winston.transports.File({ filename: 'error.log', level: 'error' }),
  // new winston.transports.File({ filename: 'combined.log' }),
  // ],
});

// process.on('unhandledRejection', (reason) => {
//   logger.debug(reason);
// });

// process.on('uncaughtException', (err) => {
//   logger.debug(err);
// });

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
