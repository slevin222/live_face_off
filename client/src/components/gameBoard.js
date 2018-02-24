import React, { Component } from 'react';
import '../assets/css/gameBoard.css';
import deck from './deck';

class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPlayer: null,
            players: [1, 2, 3, 4],
            roundCounter: 1,
            currentPlayer: 1,
            roundCounter: 1,
            playerHand1: [],
            playerHand2: [],
            playerHand3: [],
            playerHand4: [],
        }

        this.dealInitialHand = this.dealInitialHand.bind(this);
        this.cardsToDiscard = this.cardsToDiscard.bind(this);
        this.discardCardBtn = this.discardCardBtn.bind(this);

        this.deck = [];
        this.discardPile = [];
        this.discardArr = [];
    }

    componentDidMount() {
        this.shuffleDeck();
    }


    shuffleDeck() {
        this.deck = deck.sort(function () { return 0.5 - Math.random(); });
    }

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
            // this.deal(this.state.players[playersIndex]);
            // }
        }
        this.setState({
            playerHand1: [...hand1],
            playerHand2: [...hand2],
            playerHand3: [...hand3],
            playerHand4: [...hand4]
        });
    }

    runGame() {
        const currentHands = this.state.playerHands;

        if (this.roundCounter < 2) {
            this.showHand(this.currentPlayer);
        } else {
            let winningValue = 100;
            let winningPlayer = '';
            for (let playerIndex = 0; playerIndex < this.state.players.length; playerIndex++) {
                let currentValue = null;
                for (let cardIndex = 0; cardIndex < tcurrentHands[playerIndex].length; cardIndex++) {
                    // currentValue += this.players[playerIndex].hand[cardIndex].value;
                    currentValue += currentHands[playerIndex].value;
                }
                console.log('Player ' + (playerIndex + 1) + ' is ' + currentValue);
                if (currentValue < winningValue) {
                    winningValue = currentValue;
                    winningPlayer = this.players[playerIndex].name;
                }
            }
            console.log(winningPlayer + ' won with a value of ' + winningValue);
        }
    };

    cardsToDiscard(event) {
        let cardPosition = parseInt((event.target.className).slice(-1));
        this.discardArr.push(cardPosition);
        console.log(this.discardArr);
        // push(cardPosition);


    };

    discardCardBtn() {
        console.log(this.discardArr);
        this.discardCards(this.discardArr);
    };

    discardCards(deleteIndexArray) {
        if (deleteIndexArray.length > 3 || deleteIndexArray.length < 1) {
            return console.error('You can only discard 1 to 3 cards per turn');
        }
        if (this.deck.length < deleteIndexArray.length) {
            for (let discardPileIndex = 0; discardPileIndex < this.discardPile.length; discardPileIndex++) {
                this.deck.push(this.discardPile[discardPileIndex]);
            }
            this.shuffleDeck();

        }

        //////////start here
        deleteIndexArray.sort(function (a, b) { return b - a });
        let currentPlayersHand = this.state.playerHands[0];
        for (let cardIndex = 0; cardIndex < deleteIndexArray.length; cardIndex++) {
            let currentCard = currentPlayersHand.splice(deleteIndexArray[cardIndex], 1);
            this.state.discardPile.push(currentCard[0]);
            this.deal(this.players[this.currentPlayer]);
        }
        console.log(this.players[this.currentPlayer].hand);
        if (this.currentPlayer < this.playerCount - 1) {
            this.currentPlayer++;
            this.showHand(this.currentPlayer);
        } else {
            this.currentPlayer = 0;
            this.roundCounter++;
            this.runGame();
        }
        this.discardPile.push(this.discardArr);
        this.discardArr = [];
    };

    render() {
        const { playerHand1, playerHand2, playerHand3, playerHand4, deckOfCards } = this.state;
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
                <div onClick={this.cardsToDiscard} className="playerCard0 z-depth-4" style={{ backgroundImage: "url(" + playerHand1[0].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="playerCard1 z-depth-4" style={{ backgroundImage: "url(" + playerHand1[1].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="playerCard2 z-depth-4" style={{ backgroundImage: "url(" + playerHand1[2].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="playerCard3 z-depth-4" style={{ backgroundImage: "url(" + playerHand1[3].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="playerCard4 z-depth-4" style={{ backgroundImage: "url(" + playerHand1[4].image + ")" }} ></div>
                <div className="bottomInfo">
                    <div className="bottom0">{playerHand1[0].value}</div>
                    <div className="bottom1">{playerHand1[1].value}</div>
                    <div className="bottom2">{playerHand1[2].value}</div>
                    <div className="bottom3">{playerHand1[3].value}</div>
                    <div className="bottom4">{playerHand1[4].value}</div>
                </div>
                <div className="footer">
                    <button onClick={this.discardCardBtn} className="waves-effect waves-light btn blue-grey darken-2" type="submit">Discard Cards</button>
                </div>
            </div >
        );
    }
}

export default GameBoard;