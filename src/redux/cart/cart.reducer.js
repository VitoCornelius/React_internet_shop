import {CartActionTypes} from "./cart.types";
import { addItemToCart, removeCartItem} from "./cart.utils";

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
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartitem => cartitem.id !== action.payload.id)
            };
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeCartItem(action.payload,  state.cartItems)
            };
        default:
            return state;
    }
};

export default cartReducer;