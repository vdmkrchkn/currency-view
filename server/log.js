const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      name: 'info-file',
      filename: './logs/filelog-info.log',
      level: 'info',
    }),
    new winston.transports.File({
      name: 'error-file',
      filename: './logs/filelog-error.log',
      level: 'error',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
    ),
    handleExceptions: true,
  }));
}

module.exports = logger;
