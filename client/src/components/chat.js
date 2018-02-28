import React, { Component } from 'react';
import '../assets/css/chat.css';
import openSocket from 'socket.io-client';
import ChatHistory from './chatHistory';
import axios from 'axios';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            output: '',
            messages: [],
            room: '',
            players: []
        };

        this.socket = openSocket('/');

        this.socket.on('chat', (data) => {
            console.log('data in client: ', data);
            this.setState({
                messages: [...this.state.messages, data]
            });
            console.log('this.state.messages: ', this.state.messages);
        });

        this.socket.on('adduser', (data) => {
            console.log('data on socket.on(adduser):', data);
        })

        this.sendMessage = (event) => {
            event.preventDefault();
            this.socket.emit('chat', {
                message: this.state.message,
                room: this.state.room
            });
            this.setState({
                message: ''
            });
        }
    }

    async componentWillMount() {
        let sessionInfo = sessionStorage.getItem('gameSession');
        sessionInfo = JSON.parse(sessionInfo);
        await axios({
            method: 'post',
            url: 'tokbox/sockets',
            data: {
                room: sessionInfo.roomKey
            }
        }).then(response => {
            console.log('response from connectUsers axios call: ', response);
            this.setState({
                players: [...response.data.players],
                room: sessionInfo.roomKey
            });
            this.socket.emit('adduser', {
                room: sessionInfo.roomKey,
                players: response.data.players
            });
        });
    }

    componentWillUnmount() {
        const { room } = this.state;
        axios({
            method: 'post',
            url: '/tokbox/delete',
            data: {
                room
            }
        })
    }

    handleInputChange(event) {
        const { value } = event.target;
        this.setState({
            message: value
        });
    }
    render() {
        const { message, output, messages } = this.state;
        return (
            <div className="lituation-chat" >
                <form className="form-chat">
                    <div id="chat-window">
                        <div id="output">
                            <ChatHistory data={messages} />
                        </div>
                        <div id="feedback"></div>
                    </div>
                    <input value={this.state.message} onChange={this.handleInputChange.bind(this)} id="message" type="text" placeholder="Type Message" />
                    <button className="waves-effect waves-light btn blue-grey darken-2" onClick={this.sendMessage.bind(this)} id="send">Send</button>
                </form>
            </div>
        )
    }
}

export default Chat;
