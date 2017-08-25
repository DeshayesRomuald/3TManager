const logger = require('../infrastructure/loggerConfig');

module.exports = () => (req, res, next) => {
    req.logger = logger;

    return next();
};
