import React, { Component } from 'react';
import GameBoard from './gameBoard';


class CardClicked extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div onClick={(event) => this.props.handleClick(event)} style={{ opacity: this.props.clickedStatus ? .6 : 1 }} className="fullHand">
                <img src={this.props.style} className={this.props.className} />
            </div >
        )
    }
}

export default CardClicked;
