const contractType = require('../contractType');
const errorsBuilder = require('../../utils/errorsBuilder');

const carPriceVersion1 = {
    version: 1,
    contractType: contractType.CAR,
    compute: (carContractSpecification, data) => {
        const carSpecification = carContractSpecification.findCarById(data.brand.id);

        if (!carSpecification) {
            throw new errorsBuilder.ApiError('Unknown car brand', { carContractSpecification, data });
        }

        return carSpecification.basePrice + (data.value * carSpecification.valuePercentage);
    }
};

module.exports = carPriceVersion1;
