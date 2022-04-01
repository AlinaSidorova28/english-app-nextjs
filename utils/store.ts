import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';

interface IStore {
    Constants?: Record<string, any>;
}

const comReducers = combineReducers({
    Constants: reducers.constantsReducer,
});

const store = createStore(
    comReducers,
    composeWithDevTools(applyMiddleware(thunk)),
);

export { store, comReducers };
export type { IStore };
