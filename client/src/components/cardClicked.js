import React, { Component } from 'react';
import GameBoard from './gameBoard';


class CardClicked extends Component {
    constructor(props) {
        super(props);
        console.log('clicked status is ' + props.clickedStatus)
    }

    render() {
        return (
            <div onClick={(event) => this.props.handleClick(event)} className={this.props.className} style={{ backgroundImage: "url(" + this.props.style + ")", display: this.props.clickedStatus ? "none" : "initial" }} ></div>

        )
    }
}

export default CardClicked;
