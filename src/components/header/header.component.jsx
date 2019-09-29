import React from 'react';
//import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/crown.svg'; // a special syntax for SVG graphics
import {auth} from '../../firebase/firabase.config';

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

//seletrors 
import {createStructuredSelector} from 'reselect'; //wtf is this ? 
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector';

//import './header.styles.scss'; replace css with styled components

import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv} from './header.styles';

const Header = ({userFromReducer, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">SHOP</OptionLink>
            <OptionLink to="/contact">CONTACT</OptionLink>
            {
                userFromReducer ?
                    <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                    :
                    <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {
            hidden ? null :
                <CartDropdown/>
        }
    </HeaderContainer>
);

// const mapStateToProps = /*(state) */ ({user : {userFromReducer}, cart : {hidden}})=> (
const mapStateToProps = createStructuredSelector( //create structured selector -> do not need to use the state 
    {
        userFromReducer : selectCurrentUser,
        hidden : selectCartHidden
    }
);

export default connect(mapStateToProps)(Header);