import {CartActionTypes} from "./cart.types";

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
    //payload is an optional thing
});

export const addItem = (item) => ({
    type : CartActionTypes.ADD_ITEM,
    payload : item
});