import React, { Component } from 'react';
import homeImage from '../assets/images/homeImg.jpeg';


class Homepage extends Component {
    render() {
        return (
            <div style={{ backgroundImage: "url(" + homeImage + ")" }} className='container'>
                <h1>Live Face Off Homepage</h1>
            </div >
        )
    }
}

export default Homepage;