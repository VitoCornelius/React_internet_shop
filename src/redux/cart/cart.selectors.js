import {createSelector} from 'reselect';

//input selector 
// input selectors 

const selectCart = state => state.cart; //this is an input selector 

export const selectCartItems = createSelector( //using the memoization 
    [selectCart],
    (cart) => cart.cartItems
)

export const selectCartItemCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => 
    accumulatedQuantity + cartItem.quantity, 0)       
)

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => 
    cartItems.reduce((accumulatedQuantity, cartItem) => 
        accumulatedQuantity + cartItem.price * cartItem.quantity,
         0)       
    
)