import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class Navbar extends Component {
    renderLinks(){
        if(this.props.auth){
            return [
                <li key='0'>
                    <Link to='/lobby'>Lobby</Link>
                </li>,
                <li key='1'>
                    <a onClick={this.props.signOut}>Logout</a>
                </li>
            ]
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

    render(){
        return (
            <nav className='blue-grey darken-3'>
                <div className="nav-wrapper ">
                    <Link style={{ marginLeft: '10px' }} to='/' className='brand-logo left'><i className="material-icons">switch_video</i>Live Face Off</Link>
                    <ul className="right">
                        {this.renderLinks()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.user.auth
    }
}

export default connect(mapStateToProps, {signIn: signIn, signOut: signOut})(Navbar);