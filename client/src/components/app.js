import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginPage from './loginPage';
import signUp from './signUp';
import GameBoard from './gameBoard';
import GamePage from './gamePage';
import TokBox from './openTok';

const App = () => {
    return (
        <div className="mainApp">
            <nav>
                <div className="nav-wrapper">
                    <Link to='/' className='brand-logo'>Live Face Off</Link>
                    <ul className="right">
                        <li><Link to='/lobby'>Lobby</Link></li>
                        <li><Link to='/register'>Sign Up</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
                </div>
            </nav>
            <Route path="/sessionpage" component={TokBox} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={signUp} />
            <Route path='/gamepage' component={GamePage} />
        </div>
    )
}
export default App;