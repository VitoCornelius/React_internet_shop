import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/crown.svg'; // a special syntax for SVG graphics
import {auth} from '../../firebase/firabase.config';

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

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

const mapStateToProps = /*(state) */ ({user : {userFromReducer}, cart : {hidden}})=> (
    {
        //: state.user.userFromReducer //tutaj jest powolywany do zycie ten router
        userFromReducer,
        hidden
    }
);

export default connect(mapStateToProps)(Header);