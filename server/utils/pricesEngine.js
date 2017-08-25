const errorsBuilder = require('./errorsBuilder');

const engine = priceEngines =>
    (contractSpecification, data) => {
        const contractEngine = priceEngines.find(priceEngine =>
            priceEngine.contractType === contractSpecification.contractType &&
            priceEngine.version === contractSpecification.version);

        if (!contractEngine) {
            throw new errorsBuilder.ApiError('No price engine available for the contrat / version', { contractSpecification, data });
        }

        return contractEngine.compute(contractSpecification, data);
    };


module.exports = engine;
