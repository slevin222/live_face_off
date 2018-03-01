import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { formInput } from '../helpers';
import '../assets/css/signUpStyle.css';
import DisplayMessages from './errorMessage';
import axios from 'axios';
import bgSignUp from '../assets/images/LFObg_orange.png'

var signUpStyle = {
    backgroundSize: 'contain',
    height: '100vh',
    width: '100vw',
    // backgroundRepeat: 'no-repeat',
    backgroundImage: 'url('+bgSignUp+')'
};


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null
        }
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleSubmitForm(formValues) {
        console.log("We're handling the submit");

        axios.post('/users/register', formValues)
            .then(res => {
                console.log("this is the response", res);
                if (res.data.hasOwnProperty('pathname')) {
                    const { origin } = location;
                    location.href = `${origin}${res.data.pathname}`;
                }

                if (res.data.hasOwnProperty('messages')) {
                    this.setState({
                        messages: res.data.messages
                    });
                }
            });
    }

    render() {
        const { handleSubmit } = this.props; //this handleSubmit is from redux-form. HOC and wraps around handleSubmitForm
        const { handleSubmitForm } = this;
        const { messages } = this.state;

        return (
            <div className="container" style={signUpStyle}>
                <DisplayMessages messages={messages} />
                <div className="col s6 l6 fullform z-depth-5">
                    <div className="row s6">
                        <form className="col s10 center-align push-s1 " onSubmit={handleSubmit(handleSubmitForm)}>
                            <div className='col s12'>
                                <h4>Sign Up</h4>
                            </div>
                            <Field component={formInput} id="signUpFirstName" icon='mood' name='firstName' placeholder='First Name' type='text'/>
                            <Field component={formInput} id="signUpLastName" icon='mood' name='lastName' placeholder='Last Name' type='text'/>
                            <Field component={formInput} id="signUpEmail" icon='mail_outline' name='email' placeholder='Email' type='email'/>
                            <Field component={formInput} id="signUpPassword" icon='work' name='password' placeholder='Password' type='password'/>
                            <Field component={formInput} id="signUpPassword2" icon='work' name='password2' placeholder='Confirm Password' type='password'/>
                            <div className="row rowlines">
                                <div className='col s12 center-align'>
                                    <button type="submit" className='signUpBtn waves-effect waves-light btn blue-grey darken-2'>Sign Up</button>
                                    <Link className='logInBtn waves-effect waves-light btn blue-grey darken-2' to='/'>Go Back</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function validate(values){
    const error = {};

    if(!values.email){
        error.email = 'Please enter an email'
    }

    if(!values.password){
        error.password = 'Please enter a password'
    }

    if(values.password !== values.password2){
        error.password2 = 'Passwords do not match'
    }

    return error;
}

SignUp = reduxForm({
    form: 'sign-up',
    validate: validate
})(SignUp);

export default connect()(SignUp);