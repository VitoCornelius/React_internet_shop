import {CartActionTypes} from "./cart.types";
import { addItemToCart} from "./cart.utils";

const INITIAL_STATE = {
    hidden: true,
    cartItems : [] //defautl no items
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
                //no payload here !
            };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
              /*  cartItems: [...state.cartItems, action.payload]*/
                cartItems: addItemToCart(state.cartItems, action.payload)
            };
        default:
            return state;
    }
};

export default cartReducer;