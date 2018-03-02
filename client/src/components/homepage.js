import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/css/homePage.css';
import LandingBG from '../assets/images/gameBG3.png';
import fam from '../assets/images/itlitfam.png';

var styles = {
    backgroundSize: 'cover',
    backroundRepeat: 'no-repeat',
    backgroundImage: 'url('+LandingBG+')'
};

class Homepage extends Component {
    render() {
        return (
            <div className='pageContainer' style={styles}>
                <div className='row'>
                    <div className='landing col s5'>
                        <div className='mainDiv'>
                            <h1 className="gameTitle home center center-align">Live Face Off </h1>
                        </div>
                    </div>
                    <div className='col s7'>
                        <div className='row'>
                            <div className="col s12">
                                <h3 className='title'>What is Live Face Off?</h3>
                                <p>Want to reconnect with a family member overseas? Need a place to hangout with buddies after a long day of work?  Live Face Off is the platform where you can easily spend some time with someone close within a few easy steps.  industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software </p>
                            </div>
                        </div>
                        <div className='fam row'>
                            <div className="col s12">
                                <img id="fam" src={fam} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <div className='accountAccess'>
                                    <Link id='signUpAcc' className='btn brown darken-4 waves-effect waves-light btn-large' to='/register' style={{ marginTop: '23px' }}>Create a Free Account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s6 offset-s3'>
                            <h1 className="feature center center-align">Features</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s3'>
                            <div className='row'>
                                <div className='col s12'>
                                    <h5 className='center center-align'>Login Friendly</h5>
                                    <div className='divider black'></div>
                                    <p>Our login process is quick and easy, especially for grandma! We've provided Facebook and Google authorization so you can log in with existing accounts, or create an account with us in a few easy steps. </p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col s12'>
                                    <h5 className='center center-align'>Easy Navigation</h5>
                                    <div className='divider black'></div>
                                    <p>Once you are logged in, you are welcomed into our lobby. You have the option of creating your own game and sharing your special key code with friends or family, or you have the option to join a room with a given key. There are no installations or downloads required to have fun on our site!</p>
                                </div>
                            </div>
                        </div>
                        <div className="imageContainer col s6">
                                <img src='https://pbs.twimg.com/media/C8PDDBMUwAAuid4.jpg' className="col s12" />
                            </div>
                            <div className='col s3'>
                                <div className='row'>
                                    <div className='col s12'>
                                        <h5 className='center center-align'>Variety of Games</h5>
                                        <div className='divider black'></div>
                                        <p><i>Coming soon!</i></p>
                                        <p>Choose from a variety of our board games or play a peer to peer game in our webchat game room. You have the option to customize scores and win conditions in each game room. </p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col s12'>
                                        <h5 className='center center-align'>Video, Voice, and Text Chat</h5>
                                        <div className='divider black'></div>
                                        <p>We enhanced the experience with enabling you to communicate with your friends and family via video, voice, and text chat. If you have a slower connection or don't have a WebRTC compatible browser, you have the option to chat or turn off your voice and video.  </p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;