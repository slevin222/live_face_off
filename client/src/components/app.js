import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Webcamfeed from './webcam';
import LoginPage from './loginPage';
import signUp from './signUp';
import GameBoard from './gameBoard';
import GamePage from './gamePage';
import '@opentok/client';
import TokBox from './openTok';

const App = () => {

    return (
        <div className="mainApp">
            <Route path="/sessionpage" component={TokBox} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={signUp} />
            <Route path='/gamepage' component={GamePage} />
        </div>
    )
}
export default App;