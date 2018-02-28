import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/createGameModal.css';

class createGameModal extends Component {

    render(){

        let redirect = null;
        if(this.props.gameType === 'webcam'){
            redirect = '/camGame';
        } else {
            redirect = '/gamepage';
        }

        let displayModal = {
            display: this.props.display ? 'block' : 'none'
        };

        return (
            <div className="createGameModal">
                <div className="createGameContent">

                    <div className='center-align'>
                        <h5>Deal 52</h5>
                        <h6>How to play</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            A alias esse, laborum non pariatur tempore!!! Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Distinctio, officiis.</p>
                    </div>

                    <div className='center-align'>
                        <h5>Unique room key</h5>
                        <div style={{margin: '12px 0'}}><span id='roomKeyStyle'>{this.props.roomKey}kkeykeykeykey</span></div>
                        <h6>Share this with your friends and family!</h6>
                    </div>

                    <div className='center-align' style={{marginTop: '18px'}}>
                        <Link to={redirect} className='btn blue-grey darken-2'>Join Room</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default createGameModal;