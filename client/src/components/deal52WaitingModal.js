import React, { Component } from 'react';
import '../assets/css/endGameModal.css';

class Deal52WaitingModal extends Component {

    render() {
        let displayModal = {
            display: this.props.display ? 'block' : 'none'
        };

        return (
            <div className='waitingGameModal' id="waitingModalContent" style={displayModal}>
                <div className='waitingModalContent contentBorder'>
                    <div className='center-align'>
                        <h4 id="waitingText">Waiting For All Players</h4>
                        {/* <div>
                            <h5>Unique room key</h5>
                            <div style={{ margin: '16px 0' }}><span className='roomKeyStyle'>{this.props.roomKey}</span></div>
                            <p>Share this key with your friends and family so they can join your room!</p>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Deal52WaitingModal;