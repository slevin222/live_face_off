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
            gameMessage: 'Click on up to 3 cards to discard'
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

        let player1Total = this.currentPointTotal(hand1);

        this.setState({
            playerHand1: [...hand1],
            playerHand2: [...hand2],
            playerHand3: [...hand3],
            playerHand4: [...hand4],
            player1Total
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
            const newMessage = 'You must only discard 1 to 3 cards per turn';
            this.setState({
                gameMessage: newMessage
            });
            this.discardArr = [];
            return;
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

        this.roundCounter++;
        let player1Total = this.currentPointTotal(this.state.playerHand1);
        this.setState({
            playerHand1: currentPlayersHand,
            player1Total,
            gameMessage: 'Click on up to 3 cards to discard'
        });

        this.discardArr = [];
        if (this.roundCounter === 10) {
            this.endGame();
        }

    };

    currentPointTotal(currentHand) {
        let currentPointTotal = 0;
        for (let cardIndex = 0; cardIndex < 5; cardIndex++) {
            currentPointTotal += currentHand[cardIndex].value;
        }
        return currentPointTotal;
    }

    endGame() {
        console.log("Game Over");
    };

    render() {
        const { playerHand1, player1Total, gameMessage } = this.state;
        console.log("state in render :", this.state);
        console.log("message :", this.state.gameMessage);

        if (!playerHand1[0] || !playerHand1[1] || !playerHand1[2] || !playerHand1[3]) {
            return (
                <div className="instructions">
                    <h3>Deal 52</h3>
                    <ul>Instructions
                    <li>Deal 52 is a 5 card per hand game where lowest point total wins after 10 rounds</li>
                        <li>When each hand is delt you must discard at least 1 card per round but not more than 3 cards</li>
                        <li>The point total per each card the value on the face with Jacks, Queens and Kings all having a 10 point value</li>
                        <li>Ace is the best card with a 1 point value</li>
                        <li>Once your hand is delt click on the high value cards you would like to discard</li>
                        <li>Then click the discard button below for those cards to be replaced</li>
                    </ul>
                    <button onClick={this.dealInitialHand} className="waves-effect waves-light btn blue-grey darken-2" type="submit">Start Game</button>
                </div>
            )
        }

        return (
            <div className="gameArea">
                <div onClick={this.cardsToDiscard} className="playerCard0" style={{ backgroundImage: "url(" + playerHand1[0].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="playerCard1" style={{ backgroundImage: "url(" + playerHand1[1].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="playerCard2" style={{ backgroundImage: "url(" + playerHand1[2].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="playerCard3" style={{ backgroundImage: "url(" + playerHand1[3].image + ")" }} ></div>
                <div onClick={this.cardsToDiscard} className="playerCard4" style={{ backgroundImage: "url(" + playerHand1[4].image + ")" }} ></div>
                <div className="bottomInfo">
                    <p>Current Round : {this.roundCounter} / 10 Total Points : {player1Total}</p>
                    <p>{gameMessage}</p>
                    <button onClick={this.discardCardBtn} className="waves-effect waves-light btn blue-grey darken-2" type="submit">Discard Cards</button>
                </div>
            </div>
        );
    }
}

export default GameBoard;

