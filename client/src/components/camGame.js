import React, { Component } from 'react';
import TokBox from './openTok'

class CamGame extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="webpage">
                <div className="row col s12 score container">
                    <div className="col s6 center-align" >
                        <div className="row">
                            <h4 className="col s3">Team 1</h4>
                            <div className="input-field col s3 ">
                                <input type="number" placeholder="Enter Score" />
                            </div>
                        </div>
                    </div>
                    <div className="col s6 center-align" >
                        <div className="row">
                            <h4 className="col s3">Team 2</h4>
                            <div className="input-field col s3 ">
                                <input type="number" placeholder="Enter Score" />
                            </div>
                        </div>
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
