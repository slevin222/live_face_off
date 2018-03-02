import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/createGameModal.css';

class createGameModal extends Component {

    render() {
        let redirect = null,
            gameName = null,
            info = null,
            contentHeight = null;
        if (this.props.gameType === 'webcam') {
            redirect = '/camGame';
            gameName = 'Webcam';
            info = 'This is an interactive webcam room where 2 players can interact with each other ' +
                'and play their own home games such as Charades or Pictionary over webcam.';
            contentHeight = {
                height: '52%'
            }
        } else {
            redirect = '/gamepage';
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
            <div className="createGameModal" style={displayModal}>
                <div className="createGameContent contentBorder" style={contentHeight}>
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
                                <Link to={redirect} className='btn green accent-4 waves-effect waves-light'>Join Room</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default createGameModal;