import React from 'react';
import { Link } from 'react-router-dom';
import GameBoard from './gameBoard';
// import Webcamfeed from './webcam';
import StatsArea from './statsArea';
import '../assets/css/gamePage.css';
import TwilioWebcam from './twilioWebcam';



export default props => {
    return (
        <div className="fullPage">
            <div className="row col s12 webcams">
                <div className="cam col s3">Cam 1</div>
                <div className="cam col s3"><TwilioWebcam /></div>
                <div className="cam col s3">Cam 3</div>
                <div className="cam col s3">Cam 4</div>
            </div>
            <div className="row col s12 gameCards">
                <StatsArea />
                <GameBoard />
            </div>
        </div>

    )

}