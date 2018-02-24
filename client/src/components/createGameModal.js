import React, { Component } from 'react';
import '../assets/css/createGameModal.css';

class createGameModal extends Component {



    render(){
        return (
            <div className="createGameModal">
                <div className="createGameContent">
                    <h5>Here is your unique room key!</h5>
                    <p>blah blah blah de dah</p>
                    <button>Join Room</button>
                </div>
            </div>
        )
    }
}

export default createGameModal;