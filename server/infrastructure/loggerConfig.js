const winston = require('winston');

const transports = [
    new (winston.transports.Console)({
        handleExceptions: true,
        humanReadableUnhandledException: true,
        prettyPrint: true,
        colorize: true,
        json: true
    }),
    new (winston.transports.File)({
        handleExceptions: true,
        humanReadableUnhandledException: true,
        filename: 'logs.log'
    })
];

const logger = new winston.Logger({
    level: 'info',
    transports
});

module.exports = logger;
