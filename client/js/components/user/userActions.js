import constants from './userConstants';

const login = (email, password) => ({ payload: { email, password }, type: constants.LOGIN_USER });
const loginFulfilled = (payload) => ({ payload, type: constants.LOGIN_USER_FULFILLED });
const loginError = (payload) => ({ payload, type: constants.LOGIN_USER_ERROR });

const logout = () => ({ type: constants.LOGOUT_USER });
const logoutFulfilled = (payload) => ({ payload, type: constants.LOGOUT_USER_FULFILLED });
const logoutError = (payload) => ({ payload, type: constants.LOGOUT_USER_ERROR });

const getUser = () => ({ type: constants.GET_USER });
const getUserFulfilled = (payload) => ({ payload, type: constants.GET_USER_FULFILLED });
const getUserError = (payload) => ({ payload, type: constants.GET_USER_ERROR });


export default {
    login,
    loginFulfilled,
    loginError,
    logout,
    logoutFulfilled,
    logoutError,
    getUser,
    getUserFulfilled,
    getUserError
};