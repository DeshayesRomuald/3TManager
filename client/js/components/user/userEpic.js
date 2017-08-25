import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import ajax from '../../ajaxObservable';
import constants from './userConstants';
import actions from './userActions';
import config from '../../config';

const apiUrl = `${config.api}/users`;

const loginEpic = (action$) =>
    action$.ofType(constants.LOGIN_USER)
        .mergeMap((action) =>
            ajax(`${apiUrl}/login`, {
                method: 'POST',
                body: JSON.stringify({ email: action.payload.email, password: action.payload.password })
            })
                .flatMap((data) => Observable.of(actions.loginFulfilled(data.response)))
                .catch((error) => Observable.of(actions.loginError(error)))
        );

const logoutEpic = (action$) =>
    action$.ofType(constants.LOGOUT_USER)
        .mergeMap((action) =>
            ajax(`${apiUrl}/logout`, {
                method: 'POST'
            })
                .flatMap((data) => Observable.of(actions.logoutFulfilled(data.response)))
                .catch((error) => Observable.of(actions.logoutError(error)))
        );

const userEpic = (action$) =>
    action$.ofType(constants.GET_USER)
        .mergeMap((action) =>
            ajax(apiUrl)
                .flatMap((data) => Observable.of(actions.getUserFulfilled(data.response)))
                .catch((error) => Observable.of(actions.getUserError(error)))
        );

export { loginEpic, userEpic, logoutEpic };
