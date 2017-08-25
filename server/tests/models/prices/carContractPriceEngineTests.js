const test = require('tape');
const sinon = require('sinon');

const carContractPriceEngine = require('../../../models/prices/carContractPriceEngine');

test('Should calculate the price based on the contract and brand', (t) => {
    const contractSpecification = {
        findCarById: (id) => ({ basePrice: 250, valuePercentage: 0.5 })
    };

    const quote = {
        brand: {
            id: 1
        },
        value: 10000
    };

    const price = carContractPriceEngine.compute(contractSpecification, quote);
    t.assert(price === 5250, 'Price should be 5250');
    t.end();
});

test('Should throws exception if no car brand found', (t) => {
    const contractSpecification = {
        findCarById: (id) => null
    };

    const quote = {
        brand: {
            id: 1
        },
        value: 10000
    };

    t.throws(() => carContractPriceEngine.compute(contractSpecification, quote), 'Should throws execption if no brand found');
    t.end();
});