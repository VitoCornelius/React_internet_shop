import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/crown.svg'; // a special syntax for SVG graphics
import {auth} from '../../firebase/firabase.config';

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

//seetrors 
import {createStructuredSelector} from 'reselect'; //wtf is this ? 
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector';

import './header.styles.scss';

const Header = ({userFromReducer, hidden}) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to="/shop">SHOP</Link>
            <Link className='option' to="/contact">CONTACT</Link>
            {
                userFromReducer ?
                    <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
            hidden ? null :
                <CartDropdown/>
        }
    </div>
);

// const mapStateToProps = /*(state) */ ({user : {userFromReducer}, cart : {hidden}})=> (
const mapStateToProps = createStructuredSelector( //create structured selector -> do not need to use the state 
    {
        userFromReducer : selectCurrentUser,
        hidden : selectCartHidden
    }
);

export default connect(mapStateToProps)(Header);