import React, { Component } from 'react';
import '../assets/css/homePage.css';
import LFOlanding from '../assets/images/LFOlanding.png'

class Homepage extends Component {
    render() {
        return (
            <div className='homePage'>
            <div className= 'row'>
                 <div className='col s12'>
                     <div className='landing'>
                         <img src={LFOlanding}/>
                     </div>
                </div>
            </div>
            <div class="divider"></div>
             <div className='row'>
                 <div className='qualityTime col s6'>
                         <h1>Spend some quality time</h1>
                  </div>
                 <div className="qualityTimeDesc col s6">
                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non viverra turpis. Nam eu porttitor dolor. Nulla aliquet, sapien a posuere finibus, mauris felis lacinia augue, a auctor turpis nunc at urna. Donec elementum velit vitae neque viverra, id tincidunt enim rhoncus. Vivamus scelerisque ante metus. Proin ac sodales ligula. Aliquam bibendum vestibulum accumsan. Morbi malesuada dignissim est, et gravida augue ultrices nec. Fusce tincidunt vel turpis et tempus. Donec convallis augue quis imperdiet scelerisque. Quisque ut orci venenatis, lobortis velit sed, elementum mi. Praesent volutpat malesuada ultrices.</p>
                     </div>
                 </div>
            <div className='row'>
                <div className='features col s10 offset-s1'>
                     <h1 className='center center-align'> Features </h1>
                </div>
            </div>
            <div className='row'>
                <div className ='featureLeft col s12 m4 l2   right-align'>
                    <div className='row'>
                        <h5>Login Friendly</h5>
                         <p>We made our login process quick and easy, especially for grandma! You may create an account with us or  sign in with existing accounts with Facebook and Google.</p>                  
                      </div>
                     <div className='row'>
                        <h5>Easy Navigation</h5>
                        <p>Once you are logged in, you are welcomed with our lobby. You have the option of creating your own game and sharing your special key code with friends or family, or you have the option to join a room with a given key. There are no installations or downloads required to have fun on our site!</p>
                    </div>
                    </div>
                <div className ='feautreImg col s12 m4 l8 center  center-align'>
                    <img src="https://pbs.twimg.com/media/C8PDDBMUwAAuid4.jpg"/>
                </div>
                <div className='featureRight s12 m4 l2  left-align'>
                    <h5>Variety of Games</h5>
                    <p><i>Coming soon!</i></p>
                     <p>Choose from a variety of our board games or play a peer to peer game in our webchat game room. You have the option to customize scores and win conditions in each game room. </p>
                    <h5>Video, Voice, and Text Chat</h5>
                    <p>Praesent non tempor risus, in egestas felis. Donec et lacus orci. Proin fermentum, sem ut sagittis scelerisque, tortor tellus tempus orci, eget imperdiet enim neque eget lacus. Donec ornare, erat nec tempor sagittis, lacus lectus lobortis velit, at finibus turpis velit eu quam. Nunc pharetra augue tempus nulla accumsan, eget pulvinar purus luctus.</p>
                </div>
            </div>
        </div>
        )
    }
}
export default Homepage;