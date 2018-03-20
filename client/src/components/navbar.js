import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import LFOlogoSM from '../assets/images/LFOlogoSM.png'
import '../assets/css/navbar.css'

class Navbar extends Component {
    //switches nav links depending if user is logged in or not.
    renderLinks() {
        if (this.props.auth) {
            return [
                <li className="navbarLi" key='0'>
                    <Link to='/lobby' className="navbarItem">Lobby</Link>
                </li>,
                <li className="navbarLi" key='1'>
                    <a onClick={this.props.signOut} className="navbarItem">Logout</a>
                </li>
            ]
        }

        return [
            <li className="navbarLi" key='0'>
                <Link to='/register' className="navbarItem">Sign Up</Link>
            </li>,
            <li className="navbarLi" key='1'>
                <Link to='/login' className="navbarItem">Login</Link>
            </li>
        ]
    }

    render() {
        return (
            <nav className='teal accent-4 navBar'>
                <div className="nav-wrapper">
                    <div>
                        <Link to='/' className='brand-logo left'><span>Live Face Off</span><img className="navImg" src={LFOlogoSM} /></Link>
                    </div>
                    <ul className="right navbarUl">
                        <li className="navbarLi"><Link to='/about' className="navbarItem">About</Link></li>
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