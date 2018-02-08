import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import '../assets/css/homePageStyle.css';

class Homepage extends Component {
    render(){
        return (
            <div className='container'>
                <div className='signInArea'>
                    <div className='row'>
                        <div className="col s12 homeTitle center-align">
                            <h1>Epic Times</h1>
                        </div>
                    </div>
                    <div className="row">
                        <form className="col s12 center-align">

                            <div className='inputFieldCentering'>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="username">Username</label>
                                        <input id="username" type="text" className="validate"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="password">Password</label>
                                        <input id="password" type="password" className="validate"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className='buttonArea col s12'>
                                    <Link className='logInBtn waves-effect waves-light btn' to='/register'>register</Link>
                                    <button type='submit' className='logInBtn waves-effect waves-light btn'>Log In</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className='buttonAreaTwo col s12 center-align'>
                                    <p className='center-align'>----------------------- or login with -----------------------</p>
                                    <button type='button' className='facebookBtn waves-effect waves-light btn light-blue darken-1'>Facebook</button>
                                    <button type='button' className='googleBtn waves-effect waves-light btn deep-orange darken-1'>Google</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;