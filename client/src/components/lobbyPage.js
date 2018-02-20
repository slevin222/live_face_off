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

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        console.log('Submitting form', this.state);

        event.preventDefault();
        const { lobbies, gameType, players, room} = this.state;

        this.setState({
            lobbies: [...lobbies, {
                'gameType': gameType,
                'players': players,
                'room': room
            }],
            gameType: '',
            players: '',
            room: ''
        });
    }

    handleChange(event){
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    componentDidMount(){
        $('select').material_select();
        $('select').on('change', this.handleChange)
    }

    componentWillUnmount(){
        $('select').off('change', this.handleChange)
    }

    render(){
        const { lobbies, gameType, players, room} = this.state;

        return (
            <div className='container'>
                <div className='divider'></div>
                <div className='row' style={{marginTop: '20px'}}>
                    <div className='col s12'>
                        <ul className='collection'>
                            <li className='collection-item avatar'>
                                <i className='material-icons circle green'>insert_chart</i>
                                <h5 style={{marginTop: 0}}><span>Elton John</span></h5>
                                <p>Team Name: blue<br/>
                                    Last Login: Yesterday<br/>
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
                                        <option value='' disabled selected>Game Type</option>
                                        <option value='webcam'>Webcam</option>
                                        <option value='deal52'>Deal 52</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col s3'>
                                <div className='input-field col s8 offset-s2'>
                                    <select value={players} name='players'>
                                        <option value='' disabled selected>Players</option>
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
                                        <option value='' disabled selected>Select Room</option>
                                        <option value='1'>Room 1</option>
                                        <option value='2'>Room 2</option>
                                        <option value='3'>Room 3</option>
                                        <option value='4'>Room 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col s3'>
                                <div className='col s8 offset-s2'>
                                    <button className='btn blue-grey darken-2' style={{ marginTop: '23px' }}>Start</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div className='divider'></div>
                {/*This whole table wil be a separate component*/}
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