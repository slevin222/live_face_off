import React, { Component } from 'react';
import '../assets/css/gameInfoModal.css';

class GameInfoModal extends Component {

    render(){
        let info = null,
            gameName = null,
            contentHeight = null;
        if(this.props.gameType === 'webcam'){
            gameName = 'Webcam';
            info = 'This is an interactive room where you can do anything your heart desires.';
            contentHeight = {
                height: '52%'
            }
        } else {
            gameName = 'Deal 52';
            info = 'Deal 52 is a 5 card per hand game where lowest point total wins after 10 rounds. ' +
                'When each hand is delt you must discard at least 1 card per round but not more than 3 cards. ' +
                'The point total per each card the value on the face with Jacks, Queens and Kings all having a 10 point value.Ace is the best card with a 1 point value. ' +
                'Once your hand is delt click on the high value cards you would like to discard. ' +
                'Then click the discard button below for those cards to be replaced';
            contentHeight = {
                height: '65%'
            }
        }

        let displayModal = {
            display: this.props.display ? 'block' : 'none'
        };

        return (
            <div className="gameInfoModal" style={displayModal}>
                <div className="gameInfoContent" style={contentHeight}>
                    <div>
                        <div className='center-align'>
                            <h5>{gameName}</h5>
                            <div className='divider'></div>
                            <h6>How to play</h6>
                            <p>{info}</p>
                        </div>
                        <div className='divider'></div>
                        <div className='center-align'>
                            <h5>Unique room key</h5>
                            <div style={{margin: '16px 0'}}><span className='roomKeyStyle'>{this.props.roomKey}</span></div>
                            <h6>Share this key with your friends and family!</h6>
                        </div>
                        <div className='center-align' style={{marginTop: '18px'}}>
                            <button className='btn blue-grey darken-2' onClick={this.props.close}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameInfoModal;