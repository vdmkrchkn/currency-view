import {createLogger, format as _format, transports as _transports} from 'winston';

const logger = createLogger({
  level: 'info',
  format: _format.json(),
  transports: [
    new _transports.File({
      name: 'info-file',
      filename: './logs/filelog-info.log',
      level: 'info',
    }),
    new _transports.File({
      name: 'error-file',
      filename: './logs/filelog-error.log',
      level: 'error',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new _transports.Console({
    level: 'debug',
    format: _format.combine(
        _format.colorize(),
        _format.simple(),
    ),
    handleExceptions: true,
  }));
}

export default logger;
