import React, { Component } from 'react';

class LobbyList extends Component {
    joinGame(){
        console.log('test')
    }

    render(){
        const list = this.props.data.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.gameType}</td>
                    <td className='center-align'>{item.currentPlayers}/{item.maxPlayers}</td>
                    <td className='center-align'>{item.room}</td>
                    <td onClick={this.joinGame.bind(this)} className='right-align '><button className='btn blue-grey darken-2'>Join</button></td>
                </tr>
            )
        });

        return (
            <div className='row'>
                <div className='col s8 offset-s2'>
                    <h5 className='center-align'>Lobbies</h5>
                    <table className='highlight bordered'>
                        <thead>
                            <tr>
                                <th>Game Type</th>
                                <th className='center-align'>Players</th>
                                <th className='center-align'>Room Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default LobbyList;