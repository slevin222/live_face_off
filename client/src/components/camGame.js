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
                <div className="col s3">
                    {/* <button className="waves-effect waves-light btn blue darken-2" >Finish Game</button> */}
                    <Chat />
                </div>
                <div className="col s9" id="webcamContainer" >
                    <div className="col s9 score container">
                        <TokBox />
                    </div>
                </div>
            </div>
        )
    }
}
export default CamGame;
