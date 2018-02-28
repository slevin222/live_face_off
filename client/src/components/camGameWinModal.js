import React, { Component } from 'react';
import '../assets/css/camGameWinModal.css';

class CamGameWinModal extends Component {

    render(){
        let displayModal = {
            display: this.props.display ? 'block' : 'none'
        };

        return (
            <div className='camGameWinModal' style={displayModal}>
                <div className='camGameWinModalContent center-align'>
                    <h1>{this.props.gameResult}</h1>
                    <h4>Final Score</h4>
                    <h4>{this.props.teamOneScore} to {this.props.teamTwoScore}</h4>
                    <button className='btn' onClick={this.props.close}>Close</button>
                </div>
            </div>
        )
    }
}

export default CamGameWinModal;