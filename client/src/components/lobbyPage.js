import React, { Component } from 'react';
import '../assets/css/lobbyPage.css'


class LobbyPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            lobbies: [],
            gameType: '',
            players: '',
            room: ''
        }
    }

    componentWillMount(){
        window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {

                let dropdowns = document.getElementsByClassName("dropdownContent");
                for (let i = 0; i < dropdowns.length; i++) {
                    let openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    }

    dropdownFunc(){
        document.getElementById("gameTypeDropdown").classList.toggle("show");
    }

    render(){
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
                        <div className='row'>
                            <div className='col s3'>
                                <div className="dropdown">
                                    <button onClick={this.dropdownFunc} className="btn dropbtn">Game Type</button>
                                    <div id="gameTypeDropdown" className="dropdownContent">
                                        <span>Webcam</span>
                                        <span>Deal 52</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col s3'>
                                <div className="dropdown">
                                    <button onClick={this.dropdownFunc} className="btn dropbtn">Players</button>
                                    <div id="playersDropdown" className="dropdownContent">
                                        <span>Webcam</span>
                                        <span>Deal 52</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col s3'>
                                <div className="dropdown">
                                    <button onClick={this.dropdownFunc} className="btn dropbtn">Room</button>
                                    <div id="roomDropdown" className="dropdownContent">
                                        <span>Webcam</span>
                                        <span>Deal 52</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col s3'>
                                <button type='button' className='btn blue-grey darken-2'>Start</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                {/*This table would be a separate component*/}
                <div className='row'>
                    <div className='col s8'>
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