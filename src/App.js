import React from 'react';
import {Switch, Route} from 'react-router-dom';

import ShopPage from './pages/shop/shop.component';
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import {auth, createUserProfileDocument} from './firebase/firabase.config'

import './App.css';
import './pages/homepage/homepage.styles.scss'

import HomePage from "./pages/homepage/homepage.component";

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            currentUser : null
        }
    }

    unsubscribeFromAuth  = null;
    //communication between the firebase app and the uset
    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
            if (userAuth){
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapShot => { //listen to any changes on that data
                    this.setState({
                        currentUser :
                            {
                                id : snapShot.id,
                                ...snapShot.data()
                            }
                    } , () => {
                        console.log(this.state);
                    })
                });
            } else {
                this.setState({
                    currentUser : userAuth
                })
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
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' component={SignInAndSignUpPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
