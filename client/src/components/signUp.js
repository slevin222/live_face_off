import React from 'react';
import '../assets/css/signUpStyle.css';

export default (props) => {
    let flexOrHide = props.showOrHide ? 'flex' : 'none';

    const style = {
        display: flexOrHide
    };

    return (
        <div className="signUpBackground" style={style}>
            <div className="signUpArea">
                <div className="row">
                    <form className="col s12" action="" method="post">

                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="signUpUsername"></label>
                                <input id="signUpUsername" type="text" name="name" className="validate" placeholder="Name" required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="signUpPassword">Password</label>
                                <input id="signUpPassword" type="password" name="password" placeholder="Password" className="validate" required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="signUpPassword2">Confirm Password</label>
                                <input id="signUpPassword" type="password" name="password2" placeholder="Confirm Password" className="validate" required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="signUpEmail">Emaill</label>
                                <input id="signUpEmail" type="email" name="email" placeholder="Email" className="validate" required />
                            </div>
                        </div>

                        <div className="row">
                            <div className='col s12 center-align'>
                                <button type='submit' className='signUpBtn waves-effect waves-light btn'>Sign Up</button>
                                <button onClick={props.displaySignUp} type='button' className='logInBtn waves-effect waves-light btn'>Cancel</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}