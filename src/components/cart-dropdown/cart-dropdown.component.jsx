import React from 'react';
import {connect} from 'react-redux';
import CustomButton from "../custom-button/cutom-button.component";
import {selectCartItems} from '../../redux/cart/cart.selectors';

import CartItem from "../cart-item/cart-item.component";

import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems
                    .map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))
            }
        </div>

        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

// const mapStateToProps = ({cart: {cartItems}}) => (
//     {cartItems}
// );

const mapStateToProps = (state) => ({ //so this is memoized 
    cartItems : selectCartItems(state)
});

export default connect(mapStateToProps)(CartDropdown);