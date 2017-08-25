const validate = (minValue, maxValue) => (contractData, next) => {
    if (contractData.value < minValue || contractData.value > maxValue) {
        return next(`Value must be between ${minValue} & ${maxValue}`);
    }

    return next();
};

module.exports = validate;
