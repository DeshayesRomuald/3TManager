const validateJson = require('jsonschema').validate;

const validate = (data, schema) => {
    const validationResult = validateJson(data, schema);

    if (validationResult.errors && validationResult.errors.length > 0) {
        const errorDetails = validationResult.errors.map(error =>
            ({ property: error.property, message: error.message }));
        return errorDetails;
    }

    return null;
};

module.exports = {
    validate
};
