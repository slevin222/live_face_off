import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/signUpStyle.css';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
    }
    // postRequest() {
    //     axios.post('http://localhost:5000/users/register')
    //         .then(res => {
    //             console.log('The response from the registration: ', resp);
    //         });
    // }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="col s12" action="/users/register" method="post">
                        <div style={{marginTop: '10px', marginBottom: '0'}} className="row">
                            <div className='col s6'>
                                <h4>Sign Up</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="signUpUsername" type="text" name="firstName" className="validate" placeholder="First Name" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="signUpUsername" type="text" name="lastName" className="validate" placeholder="Last Name" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="signUpEmail" type="email" name="email" placeholder="Email" className="validate" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="signUpPassword" type="password" name="password" placeholder="Password" className="validate" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="signUpPassword" type="password" name="password2" placeholder="Confirm Password" className="validate" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className='col s6 center-align'>
                                <button type="submit" className='signUpBtn waves-effect waves-light btn'>Sign Up</button>
                                <Link className='logInBtn waves-effect waves-light btn' to='/'>Go Back</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp