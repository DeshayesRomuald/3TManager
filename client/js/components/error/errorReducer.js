import userConstants from '../user/userConstants';

const error = (state = {}, action) => {
    if (action.type.includes('_ERROR')) {
        if (action.payload && action.payload.status === 401 && action.type !== userConstants.LOGIN_USER_ERROR) {
            location.href = '/login';
        }
    }

    return state;
};

export default error;