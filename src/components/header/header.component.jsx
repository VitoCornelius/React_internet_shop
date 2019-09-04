import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/crown.svg'; // a special syntax for SVG graphics
import {auth} from '../../firebase/firabase.config';

import './header.styles.scss';

const Header = ({currentUser}) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to="/shop">
                SHOP
            </Link>
            <Link className='option' to="/contact">
                CONTACT
            </Link>
            {
                currentUser ?
                    <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className='option' to='/signin'>SIGN IN</Link>
            }
        </div>
    </div>
);

const mapStateToProps = (state) => (
    {
        currentUser: state.user.userFromReducer //tutaj jest powolywany do zycie ten router
    }
);

export default connect(mapStateToProps)(Header);