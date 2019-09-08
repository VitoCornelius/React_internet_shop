export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);  //this will return the first item based on the condition

    if (existingCartItem) { // this way we are checking for undefined value !
        //map will return the new array, because this will not be a new one, just a reference
        return cartItems.map(cartitem =>
            cartitem.id === cartItemToAdd.id
                ? {...cartitem, quantity: cartitem.quantity + 1}
                :
                cartitem
        )
    } else {
        return [...cartItems, {...cartItemToAdd, quantity: 1} ] //TODO tutaj jest coś dziwnego, quantity zostaje dodane do obiektu TO JEST MODYFIKACJA OBKETU  ?????
    }

};