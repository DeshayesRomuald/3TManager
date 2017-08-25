import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from './redux';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default () => {
    const store = createStore(
        rootReducer,
        applyMiddleware(epicMiddleware)
    );

    return store;
};