import React, { Component } from 'react';
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
                            <div className="input-field col s6 ">
                                <input type="number" placeholder="Enter Score" />
                            </div>
                        </div>
                    </div>
                    <div className="center-align" >
                        <div className="row">
                            <h5 className="col s6">Team 2</h5>
                            <div className="input-field col s6 ">
                                <input type="number" placeholder="Enter Score" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Chat />
                    </div>
                </div>
                <div className="col s9" id="webcamContainer" >
                    <TokBox />
                </div>
            </div>
        )
    }
}
export default CamGame;
