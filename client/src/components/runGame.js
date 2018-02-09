import React, { Component } from 'react';

export default class RunGame extends Component() {
    constructor(props) {
        super(props);
    }

    runGame() {
        if (this.roundCounter < 15) {
            this.showHand(this.currentPlayer);
        } else {
            let winningValue = 100;
            let winningPlayer = '';
            for (let playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
                let currentValue = null;
                for (let cardIndex = 0; cardIndex < this.players[playerIndex].hand.length; cardIndex++) {
                    currentValue += this.players[playerIndex].hand[cardIndex].value;
                }
                console.log('Player ' + (playerIndex + 1) + ' is ' + currentValue);
                if (currentValue < winningValue) {
                    winningValue = currentValue;
                    winningPlayer = this.players[playerIndex].name;
                }
            }
            console.log(winningPlayer + ' Won with a value of ' + winningValue);
            return {
                render(

                    // $(".playerTurn").text(winningPlayer + ' Won with the lowest point total of ' + winningValue);
                )
            }

        }
    }
}