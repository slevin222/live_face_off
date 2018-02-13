import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Webcamfeed from './webcam';
import Homepage from './homepage';
import signUp from './signUp';
import GameBoard from './gameBoard';
import GamePage from './gamePage';

const App = () => {

    return (
        <Router>
            <div className="mainApp">
                <Route exact path='/' component={Homepage} />
                <Route path='/register' component={signUp} />
                <Route path='/gamepage' component={GamePage} />
            </div>
        </Router>
    )
}
export default App;