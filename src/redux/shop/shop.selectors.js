import {createSelector} from 'reselect';

const selectShop = state => state.shop;

export const selectShopItems = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectShopItems],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : [] //gets us all the keys in an array format
 )

export const selectCollection = collectionUrlParam => createSelector( //this selector needs a collection param !!! so an argument 
    [selectShopItems],
    // collections => collections.find(
    //     // collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    //       
    // )
    collections => collections ? collections[collectionUrlParam] : null //data normalization -> do not use the array
);

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);