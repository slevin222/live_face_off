import React, { Component } from 'react';
import '../assets/css/camGame.css';
import TokBox from './openTok';
import Chat from './chat';
import LobbyPage from './lobbyPage';


class CamGame extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="webpage row s12">
                <div className="col s3 score container">
                    <div className="center-align" >
                        <div className="row">
                            <h5 className="col s6">Team 1</h5>
                            <div className="input-field col s6 scoreInput">
                                <input type="number" placeholder="Enter Score" />
                            </div>
                        </div>
                    </div>
                    <div className="center-align" >
                        <div className="row">
                            <h5 className="col s6">Team 2</h5>
                            <div className="input-field col s6 scoreInput">
                                <input type="number" placeholder="Enter Score" />
                            </div>
                        </div>
                    </div>
                    <button className='btn blue-grey darken-2 center-align' id="winnerBtn">Display Winner</button>
                    <div>
                        <Chat />
                    </div>
                </div>
                <div className="col s8" id="webcamContainer" >
                    <TokBox />
                </div>
            </div>
        )
    }
}
export default CamGame;
