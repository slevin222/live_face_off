import React from 'react';
import GameBoard from './gameBoard';
import Webcamfeed from './webcam';
import StatsArea from './statsArea';
import '../assets/css/gamePage.css';



export default props => {
    return (
        <div className="fullPage">
            <div className="col s12 webcams">
                <div className="cam">
                    <Webcamfeed />
                </div>
                <div className="cam">Cam2</div>
                <div className="cam">Cam3</div>
                <div className="cam">Cam4</div>
            </div>
            <div classname="stats">
                <StatsArea />
            </div>
            <div className="gameArea">
                <GameBoard />
            </div>
        </div>

    )

}