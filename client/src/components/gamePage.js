import React, { Component } from 'react';
import GameBoard from './gameBoard';
import Chat from './chat';
import TokBox from './openTok';
import '../assets/css/gamePage.css';

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.roomKeyId = sessionStorage.getItem('roomKey');
    }

    render() {
        const game = "deal52";
        return (
            <div className="fullPage">
                <div className="row webcams">
                    <div className="col s12" id="webcamContainer">
                        <TokBox data={game} />
                    </div>
                </div>
                <div className="row gameCards">
                    <div className="col s3 camChat">
                        <Chat />
                    </div>
                    <GameBoard />
                </div>
            </div>
        )
    }
}

export default GamePage;
