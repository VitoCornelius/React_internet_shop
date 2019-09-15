import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import {auth, createUserProfileDocument} from './firebase/firabase.config'

import './App.css';
import './pages/homepage/homepage.styles.scss'

import ShopPage from './pages/shop/shop.component';
import HomePage from "./pages/homepage/homepage.component";
import CheckoutPage from './pages/checkout/checkout.component';

import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from './redux/user/user.selector';

import {createStructuredSelector} from 'reselect'; 

class App extends React.Component {

    unsubscribeFromAuth = null;

    //communication between the firebase app and the uset
    componentDidMount() {

        const {obtaineduser} = this.props;
        console.log(this.props);

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapShot => {
                    obtaineduser({
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    )
                });
            } else {
                obtaineduser(userAuth);
            }
        })
    }

    //communication between the firebase app and the uset
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {

        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/checkout' component={CheckoutPage}/>
                    <Route exact path='/signin' render={
                        () => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)
                    }/>
                    {/*<Route exact path='/signin' component={SignInAndSignUpPage}/>*/}

                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector( {
    currentUser : selectCurrentUser
});
// const mapStateToProps = ({user}) => ({ //destrucuturuize the state
//     currentUser: user.userFromReducer //access to this.props.currentuser
// });


const mapDispatchToProps = dispatch => ({
    obtaineduser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
