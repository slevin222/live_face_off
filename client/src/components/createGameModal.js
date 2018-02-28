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
            <div className="createGameModal" style={displayModal}>
                <div className="createGameContent">
                    <h5>Here is your unique room key!</h5>
                    <p>{this.props.roomKey}</p>
                    <Link to={redirect} className='btn'>Join Room</Link>
                </div>
            </div>
        )
    }
}

export default createGameModal;