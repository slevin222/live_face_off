import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/css/homePage.css';
import LandingBG from '../assets/images/gameBG3.png'

var styles = {
    backgroundSize: 'cover',
    backroundRepeat: 'no-repeat',
    backgroundImage: 'url('+LandingBG+')'
};
  
class Homepage extends Component {
    renderLinks(){
        return [
            <li key='0'>
                <Link to='/register'>Sign Up</Link>
            </li>,
            <li key='1'>
                <Link to='/login'>Login</Link>
            </li>
        ]
    }
    render() {
        return (
         <div className='pageContainer' style={ styles }>
            <div className= 'row '>
                 <div className='landing col s5'>
                     <div className='mainDiv'>
                            <h1 className ="gameTitle home center center-align">Live Face Off </h1>
                            <h1 className ="gameTitle  home center center-align"></h1>
                    </div>
                </div>
                <div className='col s7 center center-align'>
                    <div className='row'>
                        <h3 className='title'>What is Live Face Off?</h3>
                        <p>Want to reconnect with a family member overseas? Need a place to hangout with buddies after a long day of work?  Live Face Off is the platform where you can easily spend some time with someone close within a few easy steps. </p>
                    </div>
                    <div className='row'>
                        <h3 className='title center center-align'>Features</h3>
                        <div className='accountAccess'>
                        <button id='signUpAcc' className='btn brown darken-4 waves-effect waves-light btn-large' style={{ marginTop: '23px' }}>Create a Free Account</button>
                        </div>
                    </div>
            </div>
        </div>
        <div className='row homeRow'>
                <div className ='featureLeft col s12 m4 l2  right-align'>
                    <div className='row center center-align'>
                        <h5>Login Friendly</h5>
                         <p>Our login process is quick and easy, especially for grandma! We've provided Facebook and Google authorization so you can log in with existing accounts, or create an account with us in a few easy steps. </p>               
                      </div>
                     <div className='row center center-align'>
                        <h5>Easy Navigation</h5>
                        <p>Once you are logged in, you are welcomed into our lobby. You have the option of creating your own game and sharing your special key code with friends or family, or you have the option to join a room with a given key. There are no installations or downloads required to have fun on our site!</p>
                    </div>
                    </div>
                <div className ='feautreImg col s12 m4 l8 center  center-align hide-on-med-and-down'>
                    <img src="https://pbs.twimg.com/media/C8PDDBMUwAAuid4.jpg"/>
                </div>
                <div className='featureRight s12 m4 l2  left-align'>
                    <h5>Variety of Games</h5>
                    <p><i>Coming soon!</i></p>
                     <p>Choose from a variety of our board games or play a peer to peer game in our webchat game room. You have the option to customize scores and win conditions in each game room. </p>
                    <h5>Video, Voice, and Text Chat</h5>
                    <p>We enhanced the experience with enabling you to communicate with your friends and family via video, voice, and text chat. If you have a slower connection or don't have a WebRTC compatible browser, you have the option to chat or turn off your voice and video.  </p>
                </div>
            </div>
        </div>
        )
    }
}


export default Homepage;