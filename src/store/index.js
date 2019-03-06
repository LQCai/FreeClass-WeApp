import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducers from '../reducers';


const middlewares = [
    thunkMiddleware,
    createLogger(),
]

export default function configStore() {
    const store = createStore(rootReducers, applyMiddleware(...middlewares));
    return store;
}