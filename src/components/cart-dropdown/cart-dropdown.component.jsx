import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import CustomButton from "../custom-button/cutom-button.component";
import {selectCartItems} from '../../redux/cart/cart.selectors';
import CartItem from "../cart-item/cart-item.component";

import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems, history}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length  ? //because 0 is equal to false 
                cartItems
                    .map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))
                    : (
                    <span className='empty-message'>Your cart is empty</span>
                    )
            }
        </div>

        <CustomButton onClick={() => history.push('/checkout')} >GO TO CHECKOUT</CustomButton>
    </div>
);

// const mapStateToProps = ({cart: {cartItems}}) => (
//     {cartItems}
// );

const mapStateToProps = (state) => ({ //so this is memoized 
    cartItems : selectCartItems(state)
});

export default withRouter(connect(mapStateToProps)(CartDropdown));  //the order matters 