import React, { Component } from 'react';
import '../assets/css/endGameModal.css';

class Deal52WaitingModal extends Component {

    render() {
        let displayModal = {
            display: this.props.display ? 'block' : 'none'
        };

        return (
            <div className='endGameModal' style={displayModal}>
                <div className='endGameModalContent'>
                    <div className='center-align'>
                        <h3>Waiting For All Players</h3>
                        <h3></h3>
                        <button onClick={this.props.close} className="waves-effect waves-light btn teal accent-4">Start Game</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Deal52WaitingModal;