import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import {Route} from 'react-router-dom';

import Homepage from './homepage';
import signUp from './signUp';

const App = () => {
    return (
            <div>
                <Route exact path='/' component={Homepage}/>
                <Route path='/register' component={signUp}/>
            </div>
        )
}

export default App;
