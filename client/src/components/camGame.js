import React, { Component } from 'react';
import TokBox from './openTok';
import '../assets/css/camGame.css';
import Chat from './chat';
import CamGameWinModal from "./camGameWinModal";

class CamGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayModal: false,
            teamOneScore: 0,
            teamTwoScore: 0,
            winningTeam: ''
        }

        this.displayWinner = this.displayWinner.bind(this);
        this.closeWinModal = this.closeWinModal.bind(this);
        this.handleScoreInput = this.handleScoreInput.bind(this);
    }

    handleScoreInput(event){
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    displayWinner() {
        const { teamOneScore, teamTwoScore } = this.state;
        let msg = (teamOneScore === teamTwoScore) ? 'Tie game!' : (teamOneScore > teamTwoScore) ? 'Team 1 wins!': 'Team 2 wins!';

        this.setState({
            displayModal: true,
            winningTeam: msg
        })
    }

    closeWinModal(){
        this.setState({
            displayModal: false,
            winningTeam: ''
        })
    }

    render() {
        const { displayModal, teamOneScore, teamTwoScore, winningTeam } = this.state;
        const roomKeyId = sessionStorage.getItem("roomKey");

        return (
            <div className="webpage row s12">
                <div className="col s3 score container">
                    <p>Room Key : {roomKeyId}</p>
                    <div className="center-align" >
                        <div className="row">
                            <div className="col s5">
                                <h6>Team 1</h6>
                                <input id='teamOneScore' onChange={this.handleScoreInput} name='teamOneScore' value={teamOneScore} className="score" type="number" placeholder="Enter Scoreee" />
                            </div>
                            <div className="col s5">
                                <h6>Team 2</h6>
                                <input id='teamTwoScore' onChange={this.handleScoreInput} name='teamTwoScore' value={teamTwoScore} className="score" type="number" placeholder="Enter Score" />
                            </div>
                        </div>
                    </div>
                    <button onClick={this.displayWinner} className='btn blue-grey darken-2 center-align' id="winnerBtn">Display Winner</button>
                    <div>
                        {/*<Chat />*/}
                    </div>
                </div>
                <div className="col s9" >
                    {/*<TokBox />*/}
                </div>
                <CamGameWinModal display={displayModal} close={this.closeWinModal} gameResult={winningTeam} teamOneScore={teamOneScore} teamTwoScore={teamTwoScore}/>
            </div>
        )
    }
}

export default CamGame;
