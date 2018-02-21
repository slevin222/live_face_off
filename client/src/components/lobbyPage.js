import React, { Component } from 'react';
import '../assets/css/lobbyPage.css'
import axios from 'axios';
import LobbyList from "./lobbyList";

class LobbyPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lobbies: [],
            gameType: '',
            maxPlayers: '',
            room: ''
        };

        //lobbies dummy data
        this.lobbyData = [
            {
                'gameType': 'Deal 52',
                'currentPlayers': '4',
                'maxPlayers': '4',
                'room': '1'
            },
            {
                'gameType': 'Deal 52',
                'currentPlayers': '3',
                'maxPlayers': '4',
                'room': '2'
            },
            {
                'gameType': 'Webcam',
                'currentPlayers': '1',
                'maxPlayers': '2',
                'room': '3'
            },
            {
                'gameType': 'Webcam',
                'currentPlayers': '1',
                'maxPlayers': '2',
                'room': '3'
            },
        ]

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

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
        const data = { gameType, room, players };
        console.log('Data sent to server: ', data);
        axios({
            method: 'post',
            url: `/tokbox/room/${room}`,
            data: {
                gameType,
                room,
                players
            }
        }).then(res => {
            console.log("this is the response", res);
            const dataFromServer = JSON.stringify(res.data);
            sessionStorage.setItem('gameSession', dataFromServer);
            console.log(JSON.parse(dataFromServer));
            if (res.data.hasOwnProperty('pathname')) {
                const { origin } = location;
                location.href = `${origin}${res.data.pathname}`;
            }
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        $('select').material_select();
        $('select').on('change', this.handleChange);

        //axios call would go here and
        this.setState({
            //hobbies: *axios data goes here*
            lobbies: this.lobbyData
        })
    }

    componentWillUnmount() {
        $('select').off('change', this.handleChange);
    }

    render() {
        const { lobbies, gameType, maxPlayers, room } = this.state;
        return (
            <div className='container'>
                <div className='divider'></div>
                <div className='row' style={{ marginTop: '20px' }}>
                    <div className='col s12'>
                        <ul className='collection'>
                            <li className='collection-item avatar'>
                                <i className='material-icons circle green'>insert_chart</i>
                                <h5 style={{ marginTop: 0 }}><span>Elton John</span></h5>
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
                            <div className='col s3'>
                                <div className='input-field col s8 offset-s2'>
                                    <select value={gameType} name='gameType'>
                                        <option value='' disabled>Game Type</option>
                                        <option value='webcam'>Webcam</option>
                                        <option value='deal52'>Deal 52</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col s3'>
                                <div className='input-field col s8 offset-s2'>
                                    <select value={maxPlayers} name='maxPlayers'>
                                        <option value='' disabled>Players</option>
                                        <option value='1'>1 Player</option>
                                        <option value='2'>2 Players</option>
                                        <option value='3'>3 Players</option>
                                        <option value='4'>4 Players</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col s3'>
                                <div className='input-field col s8 offset-s2'>
                                    <select value={room} name='room'>
                                        <option value='' disabled>Select Room</option>
                                        <option value='1'>Room 1</option>
                                        <option value='2'>Room 2</option>
                                        <option value='3'>Room 3</option>
                                        <option value='4'>Room 4</option>
                                        <option value='5'>Room 5</option>
                                        <option value='6'>Room 6</option>
                                        <option value='7'>Room 7</option>
                                        <option value='8'>Room 8</option>
                                        <option value='9'>Room 9</option>
                                        <option value='10'>Room 10</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col s3'>
                                <div className='col s8 offset-s2'>
                                    <button className='btn blue-grey darken-2' type="submit" style={{ marginTop: '23px' }}>Start</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='divider'></div>
                <LobbyList data={lobbies}/>
            </div>
        )
    }
}

export default LobbyPage;