import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <nav className='blue-grey darken-3'>
            <div className="nav-wrapper ">
                <Link style={{ marginLeft: '10px' }} to='/' className='brand-logo'>Live Face Off</Link>
                <ul className="right">
                    <li><Link to='/camGame'>WebCam Game</Link></li>
                    <li><Link to='/gamepage'>TEMP Gamepage Link</Link></li>
                    <li><Link to='/lobby'>Lobby</Link></li>
                    <li><Link to='/register'>Sign Up</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            </div>
        </nav>
    )
}