import SHOP_DATA from "./shop.data"

import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
    collections : null //we do not have a initial data, we need to download the data from the backend 
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        default: 
            return state;
    }
}

export default shopReducer;