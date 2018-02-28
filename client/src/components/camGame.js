import React, { Component } from 'react';
import TokBox from './openTok';
import '../assets/css/camGame.css';
import Chat from './chat';
import LobbyPage from './lobbyPage';


class CamGame extends Component {
    constructor(props) {
        super(props)


        this.displayWinner = this.displayWinner.bind(this);
    }

    displayWinner() {

    }

    render() {
        const roomKeyId = sessionStorage.getItem("roomKey");
        return (
            <div className="webpage row s12">
                <div className="col s3 score container">
                    <p>Room Key : {roomKeyId}</p>
                    <div className="center-align" >
                        <div className="row">
                            <div className="col s5">
                                <h6>Team 1</h6>
                                <input className="score" type="number" placeholder="Enter Score" />
                            </div>
                            <div className="col s5">
                                <h6>Team 2</h6>
                                <input className="score" type="number" placeholder="Enter Score" />
                            </div>
                        </div>
                    </div>
                    <button onClick={this.displayWinner} className='btn blue-grey darken-2 center-align' id="winnerBtn">Display Winner</button>
                    <div>
                        <Chat />
                    </div>
                </div>
                <div className="col s9" >
                    <TokBox />
                </div>
            </div>
        )
    }
}
export default CamGame;
