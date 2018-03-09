import React, { Component } from 'react';
import '../assets/css/lobbyPage.css'
import axios from 'axios';
import GameInfoModal from './gameInfoModal';
import Leaderboard from './leaderboard';
import DisplayMessages from './errorMessage';
import dummyData from './dummyData';

class LobbyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lobbies: [],
            leaderboardData: [],
            gameType: 'webcam',
            maxPlayers: '2',
            room: '',
            firstName: '',
            lastName: '',
            roomKey: '',
            displayModal: false,
            messages: null,
            teamName: '',
            //roomKey that is used in the Modal
            roomKeyFromServer: ''
        };
        //leaderboard dummy data
        this.leaderboardDummyData = dummyData;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleJoinSubmit = this.handleJoinSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    setDisplayModal() {
        this.setState({
            displayModal: true
        })
    }

    //route that grabs user's information from the server
    getUserInfo() {
        axios({
            method: 'get',
            url: 'tokbox/lobby',
        }).then(res => {
            this.setState({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                teamName: `${res.data.firstName}'s Team`
            });
        });
    }

    //attached to the start button, sends info the server to create the lobby, then receives the key used for people to join with.
    handleSubmit(event) {
        document.getElementById('startButton').disabled = true;
        event.preventDefault();

        const { lobbies, gameType, maxPlayers, room } = this.state;
        this.setState({
            lobbies: [...lobbies, {
                'gameType': gameType,
                'maxPlayers': maxPlayers,
                'room': room
            }],
        });
        const data = { gameType, maxPlayers };

        axios({
            method: 'post',
            url: `/tokbox/room`,
            data: {
                gameType,
                maxPlayers
            }
        }).then(res => {
            this.setState({
                roomKeyFromServer: res.data.roomKey
            });

            const dataFromServer = JSON.stringify(res.data);
            sessionStorage.setItem('gameSession', dataFromServer);
            sessionStorage.setItem('roomKey', res.data.roomKey);

            this.setDisplayModal();
        });
    }

    //checks the roomKey that was entered against any in the database, then joins if there is a match.
    handleJoinSubmit(event) {
        document.getElementById('joinButton').disabled = true;
        const { roomKey } = this.state;
        event.preventDefault();

        axios({
            method: 'post',
            url: `/tokbox/create`,
            data: {
                roomKey
            }
        }).then(res => {
            const dataFromServer = JSON.stringify(res.data);
            sessionStorage.setItem('gameSession', dataFromServer);
            sessionStorage.setItem('roomKey', res.data.roomKey);

            if (res.data.hasOwnProperty('pathname')) {
                const { origin } = location;
                location.href = `${origin}${res.data.pathname}`;
            }
            if (res.data.hasOwnProperty('messages')) {
                this.setState({
                    messages: res.data.messages
                });
                document.getElementById('joinButton').disabled = false;
            }
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    componentWillMount() {
        this.getUserInfo();
        this.setState({
            displayModal: false
        })
    }

    componentDidMount() {
        $('select').material_select();
        $('select').on('change', this.handleChange);
        //axios call would go here and
        this.setState({
            //leaderboardData: *axios data goes here*
            leaderboardData: this.leaderboardDummyData
        })
    }

    componentWillUnmount() {
        $('select').off('change', this.handleChange);
    }

    render() {
        const { leaderboardData, gameType, firstName, lastName, roomKey, displayModal, messages, roomKeyFromServer, teamName } = this.state;

        return (
            <div className='container'>
                <DisplayMessages messages={messages} />
                <div className='row'>
                    <div className='col l3 s6 offset-s3 z-depth-5 contentBorder center-align profileCard'>
                        <div>
                            <div className='userIconPos'>
                                <i className="userIcon far fa-user-circle"></i>
                            </div>
                            <h5 style={{ marginTop: '5%' }}><span>{firstName || 'Elton'} {lastName || 'John'}</span></h5>
                            <ul className='profileInfo'>
                                <li>Team Name: {teamName || 'blue'}</li>
                                <li>Last Login: Yesterday</li>
                                <li>Deal 52 Total Score: 21</li>
                                <li>Deal 52 Wins: 3</li>
                            </ul>
                        </div>
                    </div>
                    <div className='col l8 s12 offset-l1 z-depth-5 createGame contentBorder'>
                        <div style={{width: '100%'}}>
                            <h5 className='center-align lobbyHeaders'>Create a Game</h5>
                            <form onSubmit={this.handleSubmit} className='row'>
                                <div className='col s4'>
                                    <div className='input-field col s8 offset-s3'>
                                        <select name='gameType'>
                                            <option value='webcam'>Webcam</option>
                                            <option value='deal52'>Deal 52</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col s4'>
                                    <div className='input-field col s8 offset-s2'>
                                        <select name='maxPlayers'>
                                            <option value='2'>2 Players</option>
                                            <option value='3'>3 Players</option>
                                            <option value='4'>4 Players</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col s4'>
                                    <div className='col s8 offset-s2'>
                                        <button id='startButton' className='btn green accent-4 waves-effect waves-light' type="submit" style={{ marginTop: '23px' }}>Start</button>
                                    </div>
                                </div>
                            </form>
                            <div className='row homepageLastRow'>
                                <div className='col s12'>
                                    <h5 className='center-align joinTitle'>Or Join a Game</h5>
                                    <form className='row' onSubmit={this.handleJoinSubmit}>
                                        <div className='col s4'>
                                            <div className='input-field col s8 offset-s8'>
                                                <input type="text" className="validate roomKey" onChange={this.handleChange} value={roomKey} name="roomKey" placeholder="Enter Room Key" />
                                            </div>
                                        </div>
                                        <div className='col s6'>
                                            <div className='col s8 offset-s7'>
                                                <button id='joinButton' className='btn orange accent-4 waves-effect waves-light' type="submit" style={{ marginTop: '23px' }}>Join</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Leaderboard data={leaderboardData} />
                <GameInfoModal fromLobby={true} gameType={gameType} roomKey={roomKeyFromServer} display={displayModal} />
            </div>
        )
    }
}

export default LobbyPage;