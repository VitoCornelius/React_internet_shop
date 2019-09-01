import React from 'react';

import FormInput from "../fomr-input/form-input.component";
import CustomButton from "../custom-button/cutom-button.component";
import './sign-in.styles.scss';
import {auth , signInWithGoogle} from "../../firebase/firabase.config";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {email ,  password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email : '', password : ''})
        } catch (error){
            console.error(error);
        }

    };

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name] : value}) //TODO wtf it this shit
    };

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your emain and pasword</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email'
                               type='email'
                               value={this.state.email}
                               label='email'
                               handleChange={this.handleChange}
                               required
                    />
                    <FormInput name='password'
                               type='password'
                               value={this.state.password}
                               label='password'
                               handleChange={this.handleChange}
                               required
                    />
                    <div className='buttons'>
                        <CustomButton type="submit" >Sign In</CustomButton>
                        <CustomButton  onClick={signInWithGoogle} isGoogleSignIn >{/*default value of true*/}
                            Sign In With Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;