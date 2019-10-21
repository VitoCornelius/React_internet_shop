import { takeEvery } from 'redux-saga/effects'; //listens for every action of the specific type
import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    yield console.log('I am fired');
}

//controlling the execution, we can stop the async collections fetching it the previour one is in progress 

export function* fetchCollectionsStart() {
    yield takeEvery( //sagas are run concurrently ! !! multiple sagas can listen to the same action
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync //another generator function to be run ! 
    );
}
