const test = require('tape');
const sinon = require('sinon');

const priceEngine = require('../../utils/pricesEngine');

const createContractSpecification = (contractType = 'car', version = '1') => {
    return {
        contractType,
        version,
        findCarById: (arg) => { }
    };
};

const createPriceEngine = (contractType = 'car', version = '1') => {
    return {
        contractType,
        version,
        compute: (spec, data) => { }
    };
};

test('Should compute price', (t) => {
    let stubContractSpecification = sinon.stub;
    let stubPriceEngineForCar = sinon.stub;

    const contractSpecification = createContractSpecification();
    const priceEngineForCar = createPriceEngine();

    const quoteData = {
        brand: {
            id: '123'
        }
    };

    const carSpeficication = {
        basePrice: 250,
        valuePercentage: 0.5
    };

    stubContractSpecification(contractSpecification, 'findCarById').withArgs(quoteData.brand.id).returns(carSpeficication);
    stubPriceEngineForCar(priceEngineForCar, 'compute').withArgs(contractSpecification, quoteData).returns(1000);

    const priceEngineInstance = priceEngine([priceEngineForCar]);

    const computedPrice = priceEngineInstance(contractSpecification, quoteData);

    t.assert(computedPrice === 1000, 'Computed price should be 1000');

    t.end();
});

test('Should throws exception if no price engine found', (t) => {
    let stubContractSpecification = sinon.stub;
    let stubPriceEngineForCar = sinon.stub;

    const contractSpecification = createContractSpecification();

    const priceEngineInstance = priceEngine([]);

    t.throws(() => priceEngineInstance(contractSpecification, {}), 'Should throws exception if no price engine found');

    t.end();
});

test('Should throws exception if no price engine found for the version', (t) => {
    let stubContractSpecification = sinon.stub;
    let stubPriceEngineForCar = sinon.stub;

    const contractSpecification = createContractSpecification();
    const priceEngineForCar = createPriceEngine(contractSpecification.contractType, contractSpecification.version + 1);

    const priceEngineInstance = priceEngine([priceEngineForCar]);

    t.throws(() => priceEngineInstance(contractSpecification, {}), 'Should throws exception if no price engine found for the version');

    t.end();
});