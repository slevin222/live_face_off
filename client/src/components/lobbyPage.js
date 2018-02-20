import React, { Component } from 'react';
import '../assets/css/lobbyPage.css'

class LobbyPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lobbies: [],
            gameType: '',
            players: '',
            room: ''
        }
    }

    componentDidMount() {
        $('select').material_select();
    }

    render() {
        return (
            <div className='container'>
                <h5>Main Lobby</h5>
                <div className="divider"></div>
                <div className='row'>
                    <div className='col s12'>
                    </div>
                </div>
                <div className="divider"></div>
                <div className='row'>
                    <div className='col s12'>
                        <h5 className='center-align'>Create a Game</h5>

                        <form className='row'>
                            <div className='col s3'>
                                <div className="input-field col s10">
                                    <select>
                                        <option value="" disabled selected>Game Type</option>
                                        <option name="webcam" value="1">Webcam</option>
                                        <option value="deal52">Deal 52</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col s3'>
                                <div className="input-field col s10">
                                    <select>
                                        <option value="" disabled selected>Players</option>
                                        <option name="player1" value="1">1 Player</option>
                                        <option name="player2" value="2">2 Players</option>
                                        <option name="player3" value="3">3 Players</option>
                                        <option name="player4" value="3">4 Players</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col s3'>
                                <div className="input-field col s10">
                                    <select>
                                        <option value="" disabled selected>Select Room</option>
                                        <option name="room1" value="1">Room 1</option>
                                        <option name="room2" value="2">Room 2</option>
                                        <option name="room3" value="3">Room 3</option>
                                        <option name="room4" value="4">Room 4</option>
                                        <option name="room5" value="5">Room 5</option>
                                        <option name="room6" value="6">Room 6</option>
                                        <option name="room7" value="7">Room 7</option>
                                        <option name="room8" value="8">Room 8</option>
                                        <option name="room9" value="9">Room 9</option>
                                        <option name="room10" value="10">Room 10</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col s3'>
                                <div className='col s10'>
                                    <button className='btn blue-grey darken-2' style={{ marginTop: '20px' }}>Start</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="divider"></div>
                {/*This table would be a separate component*/}
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
            </div>
        )
    }
}

export default LobbyPage;