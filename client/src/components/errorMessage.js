import React from 'react';

function DisplayMessages(props) {
    console.log(props.messages);
    if(props.messages !== null) {
        return (
            <div className="card-panel red lighten-2 red-text text-accent-4 z-depth-5">{props.messages}</div>
        )
    }
    return (<div></div>);
};

export default DisplayMessages;