import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import LFOlogoSM from '../assets/images/LFOlogoSM.png'

class Navbar extends Component {
    renderLinks() {
        if (this.props.auth) {
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

    render() {
        return (
            <nav className='teal accent-4 navBar'>
                <div className="nav-wrapper ">
                    <Link style={{ marginLeft: '6%' }} to='/' className='brand-logo left'><img style={{ position: 'absolute', left: '-28%', top: '8%', width: '26%' }} src={LFOlogoSM} /><span>Live Face Off</span></Link>
                    <ul className="right">
                        <li><Link to='/about'>About</Link></li>
                        {this.renderLinks()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.user.auth
    }
}

export default connect(mapStateToProps, { signIn: signIn, signOut: signOut })(Navbar);