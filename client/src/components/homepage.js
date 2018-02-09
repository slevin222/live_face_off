import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/homePageStyle.css';
import axios from 'axios';



class Homepage extends Component {
    constructor(props) {
        super(props);
        this.getRequest = this.getRequest.bind(this);
    }
    getRequest() {
        axios.get('http://localhost:5000/auth/google').then(resp => {
            console.log('Get Resp:', resp);
        });
    }
    render() {
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
                                        <label htmlFor="username"></label>
                                        <input type="text" className="validate" placeholder="Username" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="password"></label>
                                        <input id="password" type="password" className="validate" placeholder="Password" />
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
                                    <a className="facebookBtn waves-effect waves-light btn light-blue darken-1" href="">Facebook</a>
                                    <a className="googleBtn waves-effect waves-light btn deep-orange darken-1" href="http://localhost:5000/auth/google">Google</a>
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