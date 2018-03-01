import React, { Component } from 'react';
import '../assets/css/homePage.css';
// import LFOlanding from '../assets/images/LFOlanding.png';
import LandingBG from '../assets/images/gameBG3.png'

var styles = {
    backgroundSize: 'contain',
    backgroundImage: 'url('+LandingBG+')'
};
  
class Homepage extends Component {
    render() {
        return (
         <div className='pageContainer' style={ styles }>
            <div className= 'row '>
                 <div className='landing col s12'>
                     <div className='mainDiv'>
                            <h1 className ="gameTitle center center-align">Live Face</h1>
                            <h1 className ="gameTitle center center-align">Off</h1>
                            <div className="divider brown"></div>
                     </div>
                </div>
            </div>
             <div className='qualityRow row'>
                 <div className='titleLine col s12 center center-align'>
                         <h1>Spend some quality time</h1>
                  </div>
                </div>
                <div className='row'>
                 <div className="qualityTimeDesc col s12">
                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non viverra turpis. Nam eu porttitor dolor. Nulla aliquet, sapien a posuere finibus, mauris felis lacinia augue, a auctor turpis nunc at urna. Donec elementum velit vitae neque viverra, id tincidunt enim rhoncus. Vivamus scelerisque ante metus. Proin ac sodales ligula. Aliquam bibendum vestibulum accumsan. Morbi malesuada dignissim est, et gravida augue ultrices nec. Fusce tincidunt vel turpis et tempus. Donec convallis augue quis imperdiet scelerisque. Quisque ut orci venenatis, lobortis velit sed, elementum mi. Praesent volutpat malesuada ultrices.</p>
                     </div>
                 </div>


            <div className='row'>
                <div className='titleLine col s10 offset-s1'>
                     <h1 className='center center-align'> Features </h1>
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
            <div className='row'>
           
            </div>
        </div>
        )
    }
}
export default Homepage;