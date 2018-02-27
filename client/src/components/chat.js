import React, { Component } from 'react';
import '../assets/css/chat.css';
import openSocket from 'socket.io-client';
import ChatHistory from './chatHistory';
import axios from 'axios';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            output: '',
            messages: [],
            room: ''
        };
        this.socket = openSocket('/');
        this.socket.on('chat', (data) => {
            this.setState({
                messages: [...this.state.messages, data.message]
            })

        });
    }
    componentWillMount() {
        let sessionInfo = sessionStorage.getItem('gameSession');
        sessionInfo = JSON.parse(sessionInfo);
        console.log('sessionInfo in componentWillMount: ', sessionInfo);
        this.setState({
            room: sessionInfo.roomKey
        });
        console.log('this is the state after componentwillmount', this.state);
        this.socket.on('connection', (socket) => {
            console.log('Made socket connection.', socket.id);
        });
    }
    componentDidMount() {
        this.connectUsers();
    }

    connectUsers() {
        console.log('this is the state in connectUsers', this.state);
        const { room } = this.state;
        console.log('room in connectUsers', room);
        this.socket.emit('adduser', () => {
            axios({
                method: 'post',
                url: 'tokbox/sockets',
                data: {
                    room
                }
            }).then(response => {
                console.log('response from connectUsers axios call: ', response);
            });
        });
    }

    sendMessage() {
        this.socket.emit('chat', {
            message: this.state.message,
            // handle: handle.value
        });
        this.setState({
            message: ''
        });
    }

    handleInputChange(event) {
        const { value } = event.target;
        this.setState({
            message: value
        });
    }

    displayMessage(message) {

    }
    render() {
        const { message, output, messages } = this.state;
        return (
            <div id="lituation-chat">
                <div id="chat-window">
                    <div id="output">
                        <ChatHistory data={messages} />
                    </div>
                    <div id="feedback"></div>
                </div>
                <input value={this.state.message} onChange={this.handleInputChange.bind(this)} id="message" type="text" placeholder="Type Message" />
                <button className="waves-effect waves-light btn blue-grey darken-2" onClick={this.sendMessage.bind(this)} id="send">Send</button>
            </div>
        )
    }
}

export default Chat;
