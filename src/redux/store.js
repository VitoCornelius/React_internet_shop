import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger';
import {persistStore} from 'redux-persist'; //allows the browser to cache the store
import rootReducer from './root-reducer';

import thunk from 'redux-thunk'; //we do not need this anymore

import rootSaga from './root-saga';
import createSagaMiddleware from 'redux-saga' //asyns actions with sagas
const sagaMiddleware = createSagaMiddleware(); 

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') { //this is set by create react app ! 
    middlewares.push(logger);
}

//apply the redux reducers with the middleware - logging 
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);
//if we had multiple sagas, we would have to run them all , we can create a root saga  

//apply persistence in the local or session storage
export const persistor = persistStore(store);

export default {store, persistor}; //one can return the object with both stuff 