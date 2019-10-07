import ShopActionTypes from './shop.types';
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firabase.config';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => (
    {
        type : ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload : collectionsMap
    }
);

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload : errorMessage
});

export const fetchCollectionsStartAsync = () => { //reusable action async redux 
    return dispatch => {
        const collectionRef = firestore.collection('collection');
        dispatch(fetchCollectionsStart()); //inform that there is a download ongoing ! 

        collectionRef.get().then(
            snapshot => {
                const collectionsMap = convertCollectionSnapshotToMap(snapshot)
                dispatch(fetchCollectionsSuccess(collectionsMap))
            }
        ).catch(error => dispatch(fetchCollectionsFailure(error)))
    }
};