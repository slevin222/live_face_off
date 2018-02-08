import React from 'react';

import { Link } from 'react-router-dom';

import '../assets/css/signUpStyle.css';

export default (props)=> {
    return (
        <div className="signUpBackground">
            <div className="signUpArea">
                <div className="row">

                    <form className="col s12">

                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="signUpUsername">Username</label>
                                <input id="signUpUsername" type="text" className="validate" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="signUpPassword">Password</label>
                                <input id="signUpPassword" type="password" className="validate"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="signUpEmail">Email</label>
                                <input id="signUpEmail" type="email" className="validate"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className='col s12 center-align'>
                                <button type='submit' className='signUpBtn waves-effect waves-light btn'>Sign Up</button>
                                <Link className='logInBtn waves-effect waves-light btn' to='/'>Cancel</Link>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}