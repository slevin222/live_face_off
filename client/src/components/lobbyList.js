import React, { Component } from 'react';

class LobbyList extends Component {
    render(){
        const list = this.props.data.map((item, index) => {

            return (
                <tr>
                    <td>{item.gameType}</td>
                    <td className='center-align'>{item.players}/4</td>
                    <td className='center-align'>1</td>
                    <td className='right-align '><button className='btn blue-grey darken-2'>Join</button></td>
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
                        <tr>
                            <td>Deal 52</td>
                            <td className='center-align'>1/4</td>
                            <td className='center-align'>1</td>
                            <td className='right-align '><button className='btn blue-grey darken-2'>Join</button></td>
                        </tr>
                        <tr>
                            <td>Deal 52</td>
                            <td className='center-align'>4/4</td>
                            <td className='center-align'>2</td>
                            <td className='right-align'><button className='btn blue-grey darken-2'>Join</button></td>
                        </tr>
                        <tr>
                            <td>Webcam</td>
                            <td className='center-align'>2/2</td>
                            <td className='center-align'>3</td>
                            <td className='right-align'><button className='btn blue-grey darken-2'>Join</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default LobbyList;