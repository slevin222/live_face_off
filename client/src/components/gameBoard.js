import React, { Component } from 'react';
import '../assets/css/gameBoard.css';
import deck from './deck';

class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players: [1, 2, 3, 4],
            currentPlayer: 1,
            playerHand1: [],
            playerHand2: [],
            playerHand3: [],
            playerHand4: [],
            player1Total: null,
        }

        this.deck = [];
        this.discardPile = [];
        this.discardArr = [];
        this.roundCounter = 1;

        this.dealInitialHand = this.dealInitialHand.bind(this);
        this.cardsToDiscard = this.cardsToDiscard.bind(this);
        this.discardCardBtn = this.discardCardBtn.bind(this);

    }

    componentDidMount() {
        this.shuffleDeck();
    }


    shuffleDeck() {
        this.deck = deck.sort(function () { return 0.5 - Math.random(); });
    }

    dealInitialHand() {

        const numOfPlayers = this.state.players.length;
        const hand1 = [];
        const hand2 = [];
        const hand3 = [];
        const hand4 = [];
        let cardCounter = 5;

        for (let cardCountIndex = 0; cardCountIndex < cardCounter; cardCountIndex++) {
            hand1.push(this.deck.shift());
            hand2.push(this.deck.shift());
            hand3.push(this.deck.shift());
            hand4.push(this.deck.shift());
        }

        this.setState({
            playerHand1: [...hand1],
            playerHand2: [...hand2],
            playerHand3: [...hand3],
            playerHand4: [...hand4]
        });
    }

    discardCardBtn() {
        console.log(this.discardArr);
        this.discardCards(this.discardArr);
    };

    cardsToDiscard(event) {
        console.log("eTerget : ", event.target.className);
        let cardPosition = parseInt((event.target.className).slice(-1));
        console.log("card position ", cardPosition);
        this.discardArr.push(cardPosition);
        console.log(this.discardArr);
    };

    discardCards(deleteIndexArray) {

        if (deleteIndexArray.length > 3 || deleteIndexArray.length < 1) {
            return console.error('You can only discard 1 to 3 cards per turn');
        }

        if (this.deck.length < deleteIndexArray.length) {
            for (let discardPileIndex = 0; 0 <= this.discardPile.length; discardPileIndex++) {
                let oldCard = this.discardPile.pop();
                this.deck.push(oldCard);
            }
        }

        deleteIndexArray.sort(function (a, b) { return b - a });
        //////need conditional to see whos turn it is for correct player hand
        let currentPlayersHand = this.state.playerHand1;
        for (let cardIndex = 0; cardIndex < deleteIndexArray.length; cardIndex++) {
            let currentCard = currentPlayersHand.splice(deleteIndexArray[cardIndex], 1);
            this.discardPile.push(currentCard[0]);
            let newCard = this.deck.pop();
            console.log(newCard);
            console.log(this.deck);
            currentPlayersHand.push(newCard);
            console.log(currentPlayersHand);
        }
        // if (this.currentPlayer < this.playerCount - 1) {
        //     this.currentPlayer++;
        //     this.showHand(this.currentPlayer);
        // } else {
        //     this.currentPlayer = 0;
        // }
        this.setState({
            playerHand1: currentPlayersHand
        })

        this.discardArr = [];
        this.roundCounter++;
        this.runGame();
    };

    runGame() {
        if (this.roundCounter < 25) {
            return;
        } else {
            debugger;
            let winningValue = 100;
            let winningPlayer = '';
            let currentValue = this.state.player1Total;
            let playerhandTotal = this.state.playerHand1;
            for (let playerIndex = 0; playerIndex < 1; playerIndex++) {
                for (let cardIndex = 0; cardIndex < 5; cardIndex++) {
                    currentValue += playerhandTotal[cardIndex].value;
                }

                this.setState({
                    player1Total: currentValue
                });
                // if (currentValue < winningValue) {
                //     winningValue = currentValue;
                //     winningPlayer = this.players[playerIndex].name;
                // }
            }
            console.log(winningPlayer + ' won with a value of ' + winningValue);
        }
    };

    render() {
        const { playerHand1, playerHand2, playerHand3, playerHand4, deckOfCards, player1Total } = this.state;
        console.log("state in render :", this.state);
        console.log("deck in render: ", this.deck);

        if (!playerHand1[0] || !playerHand1[1] || !playerHand1[2] || !playerHand1[3]) {
            return (
                <div>
                    <button onClick={this.dealInitialHand} className="waves-effect waves-light btn blue-grey darken-2" type="submit">Start Game</button>
                </div>
            )
        }

        return (
            <div className="gameArea">
                <div onClick={this.cardsToDiscard} className="z-depth-4 playerCard0" style={{ backgroundImage: "url(" + playerHand1[0].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="z-depth-4 playerCard1" style={{ backgroundImage: "url(" + playerHand1[1].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="z-depth-4 playerCard2" style={{ backgroundImage: "url(" + playerHand1[2].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="z-depth-4 playerCard3" style={{ backgroundImage: "url(" + playerHand1[3].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="z-depth-4 playerCard4" style={{ backgroundImage: "url(" + playerHand1[4].image + ")" }} ></div>
                <div className="bottomInfo">
                    <button onClick={this.discardCardBtn} className="waves-effect waves-light btn blue-grey darken-2" type="submit">Discard Cards</button>
                </div>
            </div>
        );
    }
}

export default GameBoard;

// deal() {
    //     const p1hand = [];
    //     const p2hand = [];
    //     console.log("deal shift :", this.state.deckOfCards);
    //     // this.shuffleDeck(deck);
    //     // currentPlayer.hand.push(this.deck.cards.shift());
    //     p1hand.push(this.state.deckOfCards.shift());
    //     console.log("p1 hand in deal: ", p1hand);
    //     this.setState({
    //         player1Hand: p1hand,

    //     });
    // } 