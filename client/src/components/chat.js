import React, { Component } from 'react';
import '../assets/css/chat.css';
import openSocket from 'socket.io-client';
import ChatHistory from './chatHistory';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            output: '',
            messages: []
        };
        this.socket = openSocket('http://localhost:5000');

        this.socket.on('chat', (data) => {
            this.setState({
                messages: [...this.state.messages, data.message]
            })

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

    // message.addEventListener('keypress', function(){
    //     socket.emit('typing', handle.value);
    // })

    displayMessage(message) {

    }

    // socket.on('typing', function(data){
    //     feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    // });

    render() {
        const { message, output, messages } = this.state;
        console.log(messages);
        return (
            <div id="lituation-chat">
                <div id="chat-window">
                    <div id="output">
                        <ChatHistory data={messages} />
                    </div>
                    <div id="feedback"></div>
                </div>
                <input value={this.state.message} onChange={this.handleInputChange.bind(this)} id="message" type="text" placeholder="Type Message" />
                <button className="btn green-accent-3" onClick={this.sendMessage.bind(this)} id="send">Send</button>
            </div>
        )
    }
}

export default Chat;
