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
                <div className="row col s12 webcams" id="webcamContainer">
                    <TokBox data={game} />
                </div>
                <div className="row col s12 gameCards">
                    <div className="col s3 camChat">
                        <Chat />
                    </div>
                    <div className="col s9">
                        <GameBoard />
                    </div>
                </div >
            </div >
        )
    }
}

export default GamePage;
