const jsonSchemaValidator = require('../utils/jsonSchemaValidator');
const errorsBuilder = require('../utils/errorsBuilder');

module.exports = schema => (req, res, next) => {
    const errors = jsonSchemaValidator.validate(req.body, schema);

    if (errors) {
        return next(new errorsBuilder.ValidationError('data validation error', 'JSON-SCHEMA', errors));
    }

    return next();
};
