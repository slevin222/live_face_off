import React from 'react';
import bgAbout from '../assets/images/LFObg_grayblue.png'

var aboutStyle = {
    backgroundSize: 'contain',
    height: '100vh',
    width: '100vw',
    backgroundImage: 'url('+bgAbout+')'
};

export default (props) => {
    return (
        <div className= "pageContainer" style={ aboutStyle }>
            <div className='container'>
                 <h1>About Us</h1>
                 <p>We made this</p>
             </div>
        </div>
    )
}