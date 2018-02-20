import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GameBoard from './gameBoard';
import Chat from './chat';
import '../assets/css/gamePage.css';
import TokBox from './openTok';
import RunGame from './runGame'



class GamePage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const game = "deal52";
        return (
            <div className="fullPage">
                <div className="row col s12 webcams" id="webcamContainer">
                    <TokBox data={game} />
                </div>
                <div className="row col s12 gameCards">
                    <Chat />
                    <GameBoard />
                    <RunGame />
                </div>
            </div>
        )
    }
}
export default GamePage;
