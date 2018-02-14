import React from 'react';
import '../assets/css/statsArea.css';
import icon from '../assets/images/icon.jpg';
import Chat from './chat';

export default props => {
    return (
        <div className="statsArea">
            <Chat/>
            {/* <h4>Chat Box</h4>
            <div className="card-panel grey lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                    <div className="col s2">
                        <img src={icon} alt="" className="circle responsive-img" />
                    </div>
                    <div className="col s10">
                        <span>
                            This is my chat.
                        </span>
                    </div>
                </div>
            </div> */}
        </div>
    )
}