import constants from './userConstants';

const initialState = {
    isPending: false,
    error: false,
    data: {}
};

const user = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case constants.LOGIN_USER:
            newState = { isPending: true, data: {} };
            break;
        case constants.LOGOUT_USER:
            newState = { isPending: true, data: {} };
            break;
        case constants.GET_USER:
            newState = { isPending: true, data: state.data };
            break;
        case constants.GET_USER_FULFILLED:
            newState = { isPending: false, data: action.payload };
            break;
        case constants.LOGIN_USER_FULFILLED: {
            //save token
            window.localStorage.setItem('authorization', action.payload.token);
            newState = { isPending: false, data: action.payload.user };
            location.href = '/'; //bad
            break;
        }
        case constants.LOGOUT_USER_FULFILLED:
            newState = { isPending: false, data: {} };
            location.href = '/login'; //bad
            break;
        case constants.GET_USER_ERROR:
        case constants.LOGIN_USER_ERROR:
        case constants.LOGOUT_USER_ERROR:
            newState = { isPending: false, error: action.payload, data: {} };
            break;
    }

    return Object.assign({}, state, newState);
};

export default user;