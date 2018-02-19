import React, { Component } from 'react';
import TokBox from './openTok'

class CamGame extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="webpage">
                <div className="row col s12 score">
                    <div className="col s6" >
                        <h4>Team 1</h4>
                        <p>Score</p>
                    </div>
                    <div className="col s6">
                        <h4>Team 2</h4>
                        <p>Score</p>
                    </div>
                </div>
                <div className="row col s12 gameCards" id="webcamContainer" >
                    <TokBox />
                </div>
            </div>
        )
    }
}
export default CamGame;
