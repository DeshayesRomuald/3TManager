import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import ajax from '../../ajaxObservable';
import constants from './carContractConstants';
import actions from './carContractActions';
import config from '../../config';

const apiUrl = `${config.api}/contracts/cars`;

const postCarContractQuoteEpic = (action$) =>
    action$.ofType(constants.ADD_QUOTE)
        .mergeMap((action) =>
            ajax(`${apiUrl}/quote`, {
                method: 'POST',
                body: JSON.stringify(action.payload)
            })
                .flatMap((data) => Observable.of(actions.addQuoteFulfilled(data.response)))
                .catch((error) => Observable.of(actions.addQuoteError(error)))
        );


const getCarContractSpecificationsEpic = (action$) =>
    action$.ofType(constants.GET_SPECIFICATIONS)
        .mergeMap((action) =>
            ajax(apiUrl + '/specification/availablecars')
                .flatMap((data) => Observable.of(actions.getSpecificationsFulfilled(data.response)))
                .catch((error) => Observable.of(actions.getSpecificationsError(error)))
        );

export { getCarContractSpecificationsEpic, postCarContractQuoteEpic };
