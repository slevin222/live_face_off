import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import LFOlogoSM from '../assets/images/LFOlogoSM.png'
import '../assets/css/navbar.css'
import ConfirmModal from './confirmModal';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayModal: true,
            route: ''
        }

        this.setDisplayModal = this.setDisplayModal.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
    }

    setDisplayModal(route) {
        this.setState({
            displayModal: true,
            route: route
        })
    }

    closeConfirmModal() {
        this.setState({
            displayModal: false
        })
    }

    //switches nav links depending if user is logged in or not.
    renderLinks() {
        if(this.props.auth === true && this.props.inRoom === true){
            const { displayModal, route } = this.state;

            return (
                <div className="nav-wrapper">
                    <Link to='/' className='brand-logo left'><span>Live Face Off</span><img className="navImg" src={LFOlogoSM} /></Link>
                    <ul className="right navbarUl">
                        <li className="navbarLi">
                            {/*<Link to='/about' className="navbarItem">About</Link>*/}
                            <a onClick={() => {this.setDisplayModal('/about')}} className="navbarItem">Abouttt</a>
                        </li>
                        <li className="navbarLi">
                            <Link to='/lobby' className="navbarItem">Lobby</Link>
                        </li>
                        <li className="navbarLi">
                            <a onClick={this.props.signOut} className="navbarItem">Logout</a>
                        </li>
                    </ul>
                    <ConfirmModal display={displayModal} route={route} close={this.closeConfirmModal}/>
                </div>
            )
        } else if (this.props.auth === true && this.props.inRoom === false){

            return (
                <div className="nav-wrapper">
                    <Link to='/' className='brand-logo left'><span>Live Face Off</span><img className="navImg" src={LFOlogoSM} /></Link>
                    <ul className="right navbarUl">
                        <li className="navbarLi">
                            <Link to='/about' className="navbarItem">About</Link>
                        </li>
                        <li className="navbarLi">
                            <Link to='/lobby' className="navbarItem">Lobby</Link>
                        </li>
                        <li className="navbarLi">
                            <a onClick={this.props.signOut} className="navbarItem">Logout</a>
                        </li>
                    </ul>
                </div>
            )

        } else {

            return (
                <div className="nav-wrapper">
                    <Link to='/' className='brand-logo left'><span>Live Face Off</span><img className="navImg" src={LFOlogoSM} /></Link>
                    <ul className="right navbarUl">
                        <li className="navbarLi">
                            <Link to='/about' className="navbarItem">About</Link>
                        </li>
                        <li className="navbarLi">
                            <Link to='/register' className="navbarItem">Sign Up</Link>
                        </li>
                        <li className="navbarLi">
                            <Link to='/login' className="navbarItem">Login</Link>
                        </li>
                    </ul>
                </div>
            )
        }



        // if (this.props.auth) {
        //     return [
                {/*<li className="navbarLi" key='0'>*/}
                    {/*<Link to='/lobby' className="navbarItem">Lobby</Link>*/}
                {/*</li>,*/}
                {/*<li className="navbarLi" key='1'>*/}
                    {/*<a onClick={this.props.signOut} className="navbarItem">Logout</a>*/}
                {/*</li>*/}
        //     ]
        // }
        //
        // return [
        //     <li className="navbarLi" key='0'>
        //         <Link to='/register' className="navbarItem">Sign Up</Link>
        //     </li>,
        //     <li className="navbarLi" key='1'>
        //         <Link to='/login' className="navbarItem">Login</Link>
        //     </li>
        // ]
    }

    render() {
        console.log(this.props)
        console.log(this.props)
        return (
            <nav className='teal accent-4 navBar'>
                {/*<div className="nav-wrapper ">*/}
                    {/*<Link to='/' className='brand-logo left'><span>Live Face Off</span><img className="navImg" src={LFOlogoSM} /></Link>*/}
                    {/*<ul className="right navbarUl">*/}
                        {/*<li className="navbarLi"><Link to='/about' className="navbarItem">About</Link></li>*/}
                        {/*{this.renderLinks()}*/}
                    {/*</ul>*/}
                {/*</div>*/}
                {this.renderLinks()}
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.user.auth,
        inRoom: state.room.inRoom
    }
}

export default connect(mapStateToProps, { signIn: signIn, signOut: signOut })(Navbar);