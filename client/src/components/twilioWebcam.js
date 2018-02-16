import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import axios from 'axios';
import TwilioVideo from 'react-twilio';

class TwilioWebcam extends Component {
    constructor(props) {
        super(props);
        this.shadowStyle = {
            border: '1px solid #dcd9d9',
            borderRadius: '4px',
            marginBottom: '15px',
            boxShadow: '5px 5px 5px #e0e3e4',
            fontWeight: 'lighter'
        }
        this.state = {
            token: ''
        };
    }
    postRequest() {
        axios.post('/gamepage')
            .then(res => {
                console.log(res.data)
                this.setState({
                    token: res.data
                });
            });
    }
    componentWillMount() {
        this.postRequest();
    }
    render() {
        const { token } = this.state;
        console.log('token from the axios request', token);
        return (
            <div style={{ height: '800px', width: '50%' }}>
                <TwilioVideo roomName={'214'} token={token} style={{ ...this.shadowStyle, boxShadow: '5px 5px 5px #e0e3e4' }} />
                <button type="button" onClick={this.postRequest.bind(this)}>Get Response Data</button>
            </div>
        );
    }
}

export default TwilioWebcam;