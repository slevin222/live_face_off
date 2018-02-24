import React, { Component } from 'react';
import '../assets/css/gameBoard.css';
import deck from './deck';

class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {

            discardPile: [],
            currentPlayer: null,
            players: [1, 2, 3, 4],
            roundCounter: 1,
            currentPlayer: 1,
            roundCounter: 1,
            playerHand1: [],
            playerHand2: [],
            playerHand3: [],
            playerHand4: [],
            discardPile: []
        }

        this.dealInitialHand = this.dealInitialHand.bind(this);
        this.cardsToDiscard = this.cardsToDiscard.bind(this);

        this.deck = [];
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

    cardsToDiscard() {
        console.log("Inside cards to discard :", this);
        // let cardPosition = parseInt(cardClass.slice(-1));
        // push(cardPosition);


    };

    discardCardBtn() {
        this.discardCards(cardsToDelete);
        cardsToDelete = [];

    };

    discardCards(deleteIndexArray) {
        if (deleteIndexArray.length > 3 || deleteIndexArray.length < 1) {
            return console.error('You can only discard 1 to 3 cards per turn');
        }
        if (this.state.deckOfCards.length < deleteIndexArray.length) {
            for (let discardPileIndex = 0; discardPileIndex < this.state.discardPile.length; discardPileIndex++) {
                this.state.deckOfCards.push(this.state.discardPile[discardPileIndex]);
            }
            this.shuffleDeck();
            this.setState({
                discardPile: []
            })
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

    };

    render() {
        const { playerHand1, playerHand2, playerHand3, playerHand4, deckOfCards } = this.state;
        console.log("state in render :", this.state);
        console.log("deck in render: ", this.deck);
        debugger;
        if (!playerHand1[0] || !playerHand1[1] || !playerHand1[2] || !playerHand1[3]) {
            return (
                <div>
                    <button onClick={this.dealInitialHand} className="btn discardBtn green-accent-3" type="submit">Start Game</button>
                </div>
            )
        }
        debugger;
        return (
            <div className="gameArea">
                <div onClick={this.cardsToDiscard} className="playerCard0" style={{ backgroundImage: "url(" + playerHand1[0].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="playerCard1" style={{ backgroundImage: "url(" + playerHand1[1].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="playerCard2" style={{ backgroundImage: "url(" + playerHand1[2].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="playerCard3" style={{ backgroundImage: "url(" + playerHand1[3].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="playerCard4" style={{ backgroundImage: "url(" + playerHand1[4].image + ")" }} ></div>
                <div className="bottomInfo">
                    <div className="bottom0">{playerHand1[0].value}</div>
                    <div className="bottom1">{playerHand1[1].value}</div>
                    <div className="bottom2">{playerHand1[2].value}</div>
                    <div className="bottom3">{playerHand1[3].value}</div>
                    <div className="bottom4">{playerHand1[4].value}</div>
                </div>
                <div className="footer">
                    <button className="btn discardBtn blue-accent-3" type="submit">Discard Cards</button>
                </div>
            </div >
        );
    }
}

export default GameBoard;