import constants from './carContractConstants';

const initialState = {
    isPending: false,
    error: false,
    quote: {},
    specifications: []
};

const carContract = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case constants.GET_SPECIFICATIONS:
            newState = { isPending: true, specifications: [] };
            break;
        case constants.GET_SPECIFICATIONS_FULFILLED:
            newState = { isPending: false, specifications: action.payload };
            break;
        case constants.GET_SPECIFICATIONS_ERROR:
            newState = { isPending: false, error: action.payload };
            break;
        case constants.ADD_QUOTE:
            newState = { isPending: true, quote: {} };
            break;
        case constants.ADD_QUOTE_FULFILLED:
            newState = { isPending: false, quote: action.payload };
            break;
        case constants.ADD_QUOTE_ERROR:
            newState = { isPending: false, error: action.payload, quote: {} };
            break;
    }

    return Object.assign({}, state, newState);
};

export default carContract;