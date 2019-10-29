import { takeLatest, call, put } from 'redux-saga/effects'; //listens for every action of the specific type
import ShopActionTypes from './shop.types';
import {firestore, convertCollectionSnapshotToMap} from './../../firebase/firabase.config';

import {
    fetchCollectionsSuccess, 
    fetchCollectionsFailure
} from './shop.actions';

//take -> waits for the action to happen 
// const payload = yield take('INCREMENT') -> this is the same task, follows the rules of the generator!!!!

//takeEvery kicks off the new task every time !!! it is also not blocking, it spawns the new thread !(new saga)

//delay !!

//take latest - > cancels all the previous ones ! -> based on takeEvery ! - still spawining a new saga, but only the latest is executed

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collection');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot); //the affect, being able to cancel this, giving the cnotrol to sagas
        //put is like dispatch in saga
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

//controlling the execution, we can stop the async collections fetching it the previour one is in progress 
export function* fetchCollectionsStart() {
    yield takeLatest( //sagas are run concurrently ! !! multiple sagas can listen to the same action -> we could use the takeEvery, but take latest is the best option
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync //another generator function to be run ! 
    );
}
