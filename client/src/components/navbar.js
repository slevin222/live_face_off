import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions';

const Navbar = (props) => {

    function renderLinks(){
        if(props.auth){
            return (
                <li>
                    <a onClick={props.signOut}>Logout</a>
                </li>
            )
        }

        return [
            <li key='0'>
                <Link to='/register'>Sign Up</Link>
            </li>,
            <li key='1'>
                <Link to='/login'>Login</Link>
            </li>
        ]
    }

    return (
        <nav className='blue-grey darken-3'>
            <div className="nav-wrapper ">
                <Link style={{ marginLeft: '10px' }} to='/' className='brand-logo left'><i className="material-icons">switch_video</i>Live Face Off</Link>
                <ul className="right">
                    <li><Link to='/lobby'>Lobby</Link></li>
                    {renderLinks()}
                </ul>
            </div>
        </nav>
    )
}

function mapStateToProps(state){
    return {
        auth: state.user.auth
    }
}

export default connect(mapStateToProps, {signOut: signOut})(Navbar);