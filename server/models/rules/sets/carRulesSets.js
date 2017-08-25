const contractType = require('../../contractType');

const carRangeValueRule = require('../rules/carRangeValueRule');

const setVersion1 = {
    version: 1,
    contractType: contractType.CAR,
    rules: [
        carRangeValueRule(5000, 75000)
    ]
};

// sample if we have a new contract version
const setVersion2 = {
    version: 2,
    contractType: contractType.CAR,
    rules: [
        carRangeValueRule(8000, 80000)
        // + other rules
    ]
};

module.exports = [
    setVersion1,
    setVersion2
];
