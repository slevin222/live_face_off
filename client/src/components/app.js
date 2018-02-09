import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { Route } from 'react-router-dom';
<<<<<<< HEAD

=======
import Webcamfeed from './webcam';
>>>>>>> e673dff80e4ff5033838894643184d2a33824447
import Homepage from './homepage';
import signUp from './signUp';

const App = () => {
<<<<<<< HEAD
    return (
        <div>
            <Route exact path='/' component={Homepage} />
            <Route path='/register' component={signUp} />
        </div>
    )
=======
    return <Webcamfeed />
    // return (
    //     <div>
    //         <Route exact path='/' component={Homepage} />
    //         <Route path='/register' component={signUp} />
    //     </div>
    // )
>>>>>>> e673dff80e4ff5033838894643184d2a33824447
}

export default App;
