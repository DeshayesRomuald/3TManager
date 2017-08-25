import constants from './languagesConstants';
import { en } from './data';

const initialState = {
    currentLanguage: 'en',
    data: en
};

const user = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case constants.UPDATE_LANGUAGE:
            // load language
            const newLanguage = action.language;
            newState = { currentLanguage: true, data: newLanguage };
            break;
    }

    return Object.assign({}, state, newState);
};

export default user;