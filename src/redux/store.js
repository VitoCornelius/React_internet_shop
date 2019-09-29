import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger';
import {persistStore} from 'redux-persist'; //allows the browser to cache the store
import rootReducer from './root-reducer';

const middlewares = [];

if (process.env.NODE_ENV === 'development') { //this is set by create react app ! 
    middlewares.push(logger);
}

//apply the redux reducers with the middleware - logging 
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
//apply persistence in the local or session storage
export const persistor = persistStore(store);

export default {store, persistor}; //one can return the object with both stuff 