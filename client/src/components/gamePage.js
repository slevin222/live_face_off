import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GameBoard from './gameBoard';
import StatsArea from './statsArea';
import '../assets/css/gamePage.css';
import TokBox from './openTok';
import RunGame from './runGame'



class GamePage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="fullPage">
                <div className="row col s12 webcams" id="webcamContainer">
                    <TokBox />
                </div>
                <div className="row col s12 gameCards">
                    <StatsArea />
                    <GameBoard />
                    <RunGame />
                </div>
            </div>
        )
    }
}
export default GamePage;
