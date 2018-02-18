import React, { Component } from 'react';

class LobbyPage extends Component {
    render(){
        return (
            <div className='container'>
                <h1>Main Lobby</h1>
                <div className='row'>
                    <div className='col s12'>
                        <button type='button' className='btn waves-effect waves-light'>Go to Game Page</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LobbyPage;