import React from 'react';
import {ReactComponent as ShoppingIcon} from './../../assets/cart.svg';

import {connect} from 'react-redux';
import {toggleCartHidden} from "../../redux/cart/cart.action";
import {selectCartItemCount} from './../../redux/cart/cart.selectors';

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
const mapStateToProps = (state) => ( //this is a selector from the state
    {
        itemCount: selectCartItemCount(state)
        //this is always calculating and always returning a new value, so we are using a selector 
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);