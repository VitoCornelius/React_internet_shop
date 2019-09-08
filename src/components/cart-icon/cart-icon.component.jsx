import React from 'react';
import {ReactComponent as ShoppingIcon} from './../../assets/cart.svg';

import {connect} from 'react-redux';
import {toggleCartHidden} from "../../redux/cart/cart.action";

import './cart-icon.styles.scss';

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

//this is still being called even if the cart is not changed -> during user change !!!!!!!!!!!!!
const mapStateToProps = ({cart: {cartItems}}) => ( //this is a selector from the state
    {
        itemCount: cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
        //this is always calculating and always returning a new value
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);