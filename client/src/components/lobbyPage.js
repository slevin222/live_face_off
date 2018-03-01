import React, { Component } from 'react';
import '../assets/css/lobbyPage.css'
import axios from 'axios';
import CreateGameModal from './createGameModal';
import Leaderboard from './leaderboard';
import DisplayMessages from './errorMessage';
import bgLobby from '../assets/images/LFObg_browngreen.jpg'

var lobbyStyle = {
    backgroundSize: 'contain',
    height: '100vh',
    width: '100vw',
    backgroundImage: 'url('+bgLobby+')'
};


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

            //roomKey that is used in the Modal
            roomKeyFromServer: ''
        };

        //leaderboard dummy data
        this.leaderboardDummyData = [
            {
                'rank': '1',
                'teamName': 'Horde',
                'gameType': 'Deal 52',
                'wins': '3'
            },
            {
                'rank': '2',
                'teamName': 'Alliance',
                'gameType': 'Deal 52',
                'wins': '2'
            },
            {
                'rank': '3',
                'teamName': 'Legion',
                'gameType': 'Deal 52',
                'wins': '1'
            }
        ]

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleJoinSubmit = this.handleJoinSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    setDisplayModal(){
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
                lastName: res.data.lastName
            });
        });
    }

    //attached to the start button, sends info the server to create the lobby, then receives the key used for people to join with.
    handleSubmit(event) {
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
        console.log('Data sent to server: ', data);
        axios({
            method: 'post',
            url: `/tokbox/room`,
            data: {
                gameType,
                maxPlayers
            }
        }).then(res => {
            console.log("this is the response", res);
            this.setState({
                roomKeyFromServer: res.data.roomKey
            });
            console.log(this.state.roomKeyFromServer);
            const dataFromServer = JSON.stringify(res.data);
            sessionStorage.setItem('gameSession', dataFromServer);
            sessionStorage.setItem('roomKey', res.data.roomKey);
            console.log(JSON.parse(dataFromServer));

            this.setDisplayModal();
        });
    }

    //checks the roomKey that was entered against any in the database, then joins if there is a match.
    handleJoinSubmit(event) {
        const { roomKey } = this.state;
        event.preventDefault();
        console.log(roomKey);
        axios({
            method: 'post',
            url: `/tokbox/create`,
            data: {
                roomKey
            }
        }).then(res => {
            console.log("this is the response", res);
            const dataFromServer = JSON.stringify(res.data);
            sessionStorage.setItem('gameSession', dataFromServer);
            console.log(JSON.parse(dataFromServer));
            if (res.data.hasOwnProperty('pathname')) {
                const { origin } = location;
                location.href = `${origin}${res.data.pathname}`;

                console.log(res.data.pathname);
            }
            if (res.data.hasOwnProperty('messages')) {
                this.setState({
                    messages: res.data.messages
                });
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
        const { leaderboardData, gameType, firstName, lastName, roomKey, displayModal, messages, roomKeyFromServer } = this.state;

        return (
            <div className='container' style ={lobbyStyle}>
                <DisplayMessages messages={messages} />
                <div className='divider'></div>
                <div className='row' style={{ marginTop: '20px' }}>
                    <div className='col s6'>
                        <ul className='collection'>
                            <li className='collection-item avatar'>
                                <i className='material-icons circle green'>insert_chart</i>
                                <h5 style={{ marginTop: 0 }}><span>{firstName || 'Elton'} {lastName || 'John'}</span></h5>
                                <p>Team Name: blue<br />
                                    Last Login: Yesterday<br />
                                    Games Played: 1
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='divider'></div>
                <div className='row'>
                    <div className='col s12'>
                        <h5 className='center-align'>Create a Game</h5>
                        <form onSubmit={this.handleSubmit} className='row'>
                            <div className='col s4'>
                                <div className='input-field col s8 offset-s2'>
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
                                    <button className='btn blue-grey darken-2' type="submit" style={{ marginTop: '23px' }}>Start</button>
                                </div>
                            </div>
                        </form>
                        <div className='row'>
                            <div className='col s12'>
                                <h5 className='center-align'>Or Join a Game</h5>
                                <form className='row' onSubmit={this.handleJoinSubmit}>
                                    <div className='col s4'>
                                        <div className='input-field col s8 offset-s8'>
                                            <input type="text" className="validate roomKey" onChange={this.handleChange} value={roomKey} name="roomKey" placeholder="Room Key" />
                                        </div>
                                    </div>
                                    <div className='col s6'>
                                        <div className='col s8 offset-s7'>
                                            <button className='btn blue-grey darken-2' type="submit" style={{ marginTop: '23px' }}>Join</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='divider'></div>
                <Leaderboard data={leaderboardData}/>
                <CreateGameModal gameType={gameType} roomKey={roomKeyFromServer} display={displayModal}/>
            </div>
        )
    }
}

export default LobbyPage;