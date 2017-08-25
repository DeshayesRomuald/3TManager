import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import user from './components/user/userReducer';
import error from './components/error/errorReducer';
import languages from './components/languages/languagesReducer';
import carContract from './components/carContract/carContractReducer';

import { loginEpic, userEpic, logoutEpic } from './components/user/userEpic';
import { getCarContractSpecificationsEpic, postCarContractQuoteEpic } from './components/carContract/carContractEpic';

export const rootEpic = combineEpics(
    loginEpic,
    userEpic,
    logoutEpic,
    getCarContractSpecificationsEpic,
    postCarContractQuoteEpic
);

export const rootReducer = combineReducers({
    user,
    error,
    languages,
    carContract
});