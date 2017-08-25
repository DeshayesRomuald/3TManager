const repositories = require('../../repositories');
const Quote = require('..//quote');
const quoteStatus = require('..//quoteStatus');
const errorsBuilder = require('../../utils/errorsBuilder');

const create = (user, data) =>
    repositories.carContractSpecificationsRepository.findLastVersion()
        .then((contractSpecification) => {
            if (!contractSpecification) {
                throw new errorsBuilder.NotFoundError('cannot find car contract specification');
            }

            const quote = createQuote(user, data, contractSpecification);

            return contractSpecification.validateQuoteData(quote)
                .then((err) => {
                    if (err) {
                        quote.status = quoteStatus.REJECTED;
                        quote.rejectReason = err;
                    } else {
                        quote.status = quoteStatus.ACCEPTED;
                        const price = contractSpecification.computeQuotePrice(quote);
                        quote.price = price;
                    }

                    return quote;
                });
        });


const createQuote = (user, data, contractSpecification) => {
    const car = contractSpecification.findCarById(data.brand);

    if (!car) {
        throw new errorsBuilder.ValidationError('Unknown car brand');
    }

    return new Quote({
        user: {
            id: user.id,
            name: user.name
        },
        contract: {
            id: contractSpecification._id,
            contractType: contractSpecification.contractType,
            version: contractSpecification.version,
            data: {
                brand: {
                    id: car._id,
                    name: car.brand
                },
                driver: data.driver,
                value: data.value
            }
        }
    });
};

module.exports = {
    create
};
