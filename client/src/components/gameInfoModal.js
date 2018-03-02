import React, { Component } from 'react';
import '../assets/css/gameInfoModal.css';

class GameInfoModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            copied: false
        }
    }

    render() {
        let info = null,
            gameName = null,
            contentHeight = null;
        if (this.props.gameType === 'webcam') {
            gameName = 'Webcam';
            info = 'This is an interactive webcam room where 2 players can interact with each other ' +
                'and play their own home games such as Charades or Pictionary over webcam.';
            contentHeight = {
                height: '52%'
            }
        } else {
            gameName = 'Deal 52';
            info = 'Deal 52 is a 5 card per hand game where lowest point total wins after 10 rounds. ' +
                'When each hand is dealt you must discard at least 1 card per round but not more than 3 cards. ' +
                'The point total per each card the value on the face with Jacks, Queens and Kings all having a 10 point value. Ace is the best card with a 1 point value. ' +
                'Once your hand is dealt click on the high value cards you would like to discard. ' +
                'Then click the discard button below for those cards to be replaced.';
            contentHeight = {
                height: '65%'
            }
        }

        let displayModal = {
            display: this.props.display ? 'block' : 'none'
        };

        return (
            <div className="gameInfoModal" style={displayModal}>
                <div className="gameInfoContent contentBorder" style={contentHeight}>
                    <div className='row'>
                        <div className='col s12'>
                            <div className='center-align'>
                                <h4>{gameName}</h4>
                                <div className='divider'></div>
                                <h5>How to play</h5>
                                <p>{info}</p>
                            </div>
                            <div className='divider'></div>
                            <div className='center-align'>
                                <h5>Unique room key</h5>
                                <div style={{ margin: '16px 0' }}><span className='roomKeyStyle'>{this.props.roomKey}</span></div>
                                <p>Share this key with your friends and family!</p>
                            </div>
                            <div className='center-align' style={{ marginTop: '18px' }}>
                                <button className='btn green accent-4 waves-effect waves-light' onClick={this.props.close}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameInfoModal;