import constants from './carContractConstants';

const getSpecifications = () => ({ type: constants.GET_SPECIFICATIONS });
const getSpecificationsFulfilled = (payload) => ({ payload, type: constants.GET_SPECIFICATIONS_FULFILLED });
const getSpecificationsError = (payload) => ({ payload, type: constants.GET_SPECIFICATIONS_ERROR });

const addQuote = (payload) => ({ payload, type: constants.ADD_QUOTE });
const addQuoteFulfilled = (payload) => ({ payload, type: constants.ADD_QUOTE_FULFILLED });
const addQuoteError = (payload) => ({ payload, type: constants.ADD_QUOTE_ERROR });

export default {
    getSpecifications,
    getSpecificationsFulfilled,
    getSpecificationsError,
    addQuote,
    addQuoteFulfilled,
    addQuoteError
};
