const ObjectID = require('mongodb').ObjectID;

const buildCar = (brand, basePrice, valuePercentage) => ({
    _id: new ObjectID(),
    brand,
    basePrice,
    valuePercentage
});

const buildCars = () => [
    buildCar('AUDI', 250, 0.3),
    buildCar('BMW', 150, 0.4),
    buildCar('PORSCHE', 500, 0.7)
];

const carContractSpecification = {
    contractType: 'car',
    version: 1,
    isLatestVersion: true,
    contentValidator: {
        type: 'object',
        properties: {
            brand: {
                type: 'object',
                properties: {
                    id: {
                        type: 'object',
                        required: true
                    },
                    name: {
                        type: 'string',
                        required: true
                    }
                }
            },
            driver: {
                type: 'string',
                required: true
            },
            value: {
                type: 'number',
                required: true
            }
        }
    },
    availableCars: buildCars(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

module.exports = carContractSpecification;
