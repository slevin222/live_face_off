import React, { Component } from 'react';
import '../assets/css/endGameModal.css';

class EndGameModal extends Component {

    render() {
        let displayModal = {
            display: this.props.display ? 'block' : 'none'
        };

        return (
            <div className='endGameModal' style={displayModal}>
                <div className='endGameModalContent'>
                    <div className='center-align'>
                        <h3>Final Score</h3>
                        <h3>{this.props.points}</h3>
                        <button onClick={this.props.close} className='waves-effect waves-light btn teal accent-4'>Play Again</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EndGameModal;