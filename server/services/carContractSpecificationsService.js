const repositories = require('../repositories');
const errorsBuilder = require('../utils/errorsBuilder');
const carQuoteFactory = require('../models/factories/carQuoteFactory');

// return all the cars from the last contract specification
const availableCars = (req, res, next) =>
    repositories.carContractSpecificationsRepository.findLastVersion()
        .then((contractSpecification) => {
            if (!contractSpecification) {
                throw new errorsBuilder.NotFoundError('No valid car contract specification available');
            }

            return res.json(contractSpecification.availableCars);
        })
        .catch(err => next(err));

const createQuote = (req, res, next) => {
    
    return carQuoteFactory.create(req.user, req.body)
        .then(quote => repositories.quotesRepository.save(quote))
        // TODO send email
        .then(quote => res.json(quote))
        .catch(err => next(err));
};

module.exports = {
    availableCars,
    createQuote
};
