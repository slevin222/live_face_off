import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/signUpStyle.css';
import DisplayMessages from './errorMessage';
import axios from 'axios';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                password2: '',
            },
            messages: null
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        console.log("We're handling the submit");
        const { form } = this.state;
        event.preventDefault();
        axios.post('/users/register', form)
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
    handleInput(event) {
        const { value, name } = event.target;
        const { form } = this.state;
        form[name] = value;
        this.setState({
            form: { ...form }
        });
    }
    render() {
        const { handleInput, handleSubmit } = this;
        const { firstName, lastName, email, password, password2, messages } = this.state;

        return (
            <div className="container">
                <DisplayMessages messages={messages} />
                <div className="col s6 l6 fullform z-depth-5">
                    <div className="row s6">
                        <form className="col s10 center-align push-s1 " onSubmit={handleSubmit}>
                            <div className='col s12'>
                                <h4>Sign Up</h4>
                            </div>
                            <div className="row rowlines">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">mood</i><input id="signUpFirstName" type="text" name="firstName" className="validate" placeholder="First Name" onChange={handleInput} value={firstName} required />
                                </div>
                            </div>
                            <div className="row rowlines">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">mood</i><input id="signUpLastName" type="text" name="lastName" className="validate" placeholder="Last Name" onChange={handleInput} value={lastName} required />
                                </div>
                            </div>
                            <div className="row rowlines">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">mail_outline</i><input id="signUpEmail" type="email" name="email" placeholder="Email" className="validate" onChange={handleInput} value={email} required />
                                </div>
                            </div>
                            <div className="row rowlines">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">work</i><input id="signUpPassword" type="password" name="password" placeholder="Password" className="validate" onChange={handleInput} value={password} required />
                                </div>
                            </div>
                            <div className="row rowlines">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">work</i><input id="signUpPassword2" type="password" name="password2" placeholder="Confirm Password" className="validate" onChange={handleInput} value={password2} required />
                                </div>
                            </div>
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

export default SignUp;