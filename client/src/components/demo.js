import React, {
    Component
} from 'react';
import axios from 'axios';

class Demo extends Component {

    getRequest() {
        axios.get('http://localhost:5000/test').then(resp => {
            console.log('Get Resp:', resp);
        });
    }

    postRequest() {
        axios.post('http://localhost:5000/test', { msg: 'data from frontend', stuff: 'Some stuff' }).then(resp => {
            console.log('Post Resp:', resp);
        });
    }


    render() {
        return (
            <div>
                <h1>Demo component </h1>
                <button onClick={this.getRequest}>Get Request</button>
                <button onClick={this.postRequest}>Post Request</button>
            </div>
        )
    }
}

export default Demo;