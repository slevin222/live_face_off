import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './navbar';
import Homepage from './homepage';
import SignUp from './signUp';
import LoginPage from './loginPage';
import LobbyPage from './lobbyPage';
import GamePage from './gamePage';
import CamGame from './camGame';

const App = () => {
    return (
        <div className="mainApp">
            <Navbar />
            <Route exact path='/' component={Homepage} />
            <Route path="/camGame" component={CamGame} />
            <Route path='/gamepage' component={GamePage} />
            <Route path='/lobby' component={LobbyPage} />
            <Route path='/register' component={SignUp} />
            <Route path='/login' component={LoginPage} />
        </div>
    )
}
export default App;