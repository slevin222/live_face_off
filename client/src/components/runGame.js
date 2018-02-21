import React, { Component } from 'react';
import deck from './deck';

class RunGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deckOfCards: deck,
            currentPlayer: null,
            players: [1, 2, 3, 4],
            player1Hand: [],
            player2Hand: [],
            player3Hand: [],
            player4Hand: [],
            discardPile: []
        }

    }

    componentDidMount() {
        this.shuffleDeck(deck);
    }


    shuffleDeck(deck) {
        const shuffledDeck = deck.sort(function () { return 0.5 - Math.random(); });
        this.setState({
            deckOfCards: shuffledDeck,
            currentPlayer: null,
            players: [1, 2, 3, 4],
            player1Hand: [],
            player2Hand: [],
            player3Hand: [],
            player4Hand: [],
            discardPile: []
        });

    }

    deal(currentPlayer) {
        // this.shuffleDeck(deck);
        // currentPlayer.hand.push(this.deck.cards.shift());
        this.state.player1Hand.push(this.state.deck.shift());
    }

    dealInitialHand() {
        let cardCounter = 5;
        for (let cardCountIndex = 0; cardCountIndex < cardCounter; cardCountIndex++) {
            for (let playersIndex = 0; playersIndex < this.state.players.length; playerIndex++) {
                this.deal(this.state.players[playerIndex]);
            }
        }
    }


    // runGame() {
    //     if (this.roundCounter < 15) {
    //         this.showHand(this.currentPlayer);
    //     } else {
    //         let winningValue = 100;
    //         let winningPlayer = '';
    //         for (let playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
    //             let currentValue = null;
    //             for (let cardIndex = 0; cardIndex < this.players[playerIndex].hand.length; cardIndex++) {
    //                 currentValue += this.players[playerIndex].hand[cardIndex].value;
    //             }
    //             console.log('Player ' + (playerIndex + 1) + ' is ' + currentValue);
    //             if (currentValue < winningValue) {
    //                 winningValue = currentValue;
    //                 winningPlayer = this.players[playerIndex].name;
    //             }
    //         }
    //         console.log(winningPlayer + ' Won with a value of ' + winningValue);
    //         return {
    //             render(

    //                 // $(".playerTurn").text(winningPlayer + ' Won with the lowest point total of ' + winningValue);
    //             )
    //         }

    //     }
    // }

    // playerPickCards() {
    //     let cardClass = $(this).attr("class");
    //     let cardPosition = parseInt(cardClass.slice(-1));
    //     cardsToDelete.push(cardPosition);
    //     console.log(cardsToDelete);

    // }

    // discardCardBtn(event) {
    //     game.discardCards(cardsToDelete);
    //     cardsToDelete = [];

    // }

    // discardCards(cardsToDelete) {
    //     console.log("inside discards: " + cardsToDelete);
    //     if (cardsToDelete.length > 3 || cardsToDelete.length < 1) {
    //         return console.error('You can only discard 1 to 3 cards per turn');
    //     }

    //     if (this.deck.cards.length < cardsToDelete.length) {
    //         for (let discardPileIndex = 0; discardPileIndex < this.deck.discard_pile.length; discardPileIndex++) {
    //             this.deck.cards.push(this.deck.discard_pile[discardPileIndex]);
    //         }
    //         this.shuffleDeck();
    //         this.deck.discard_pile = [];
    //     }

    //     cardsToDelete.sort(function (a, b) { return b - a });
    //     let currentPlayersHand = this.players[this.currentPlayer].hand;
    //     for (let cardIndex = 0; cardIndex < cardsToDelete.length; cardIndex++) {
    //         let currentCard = currentPlayersHand.splice(cardsToDelete[cardIndex], 1);
    //         this.deck.discard_pile.push(currentCard[0]);
    //         //check above

    //         this.deal(this.players[this.currentPlayer]);

    //     }

    //     console.log(this.players[this.currentPlayer].hand);
    //     if (this.currentPlayer < this.playerCount - 1) {
    //         this.currentPlayer++;
    //         this.showHand(this.currentPlayer);
    //     } else {
    //         this.currentPlayer = 0;
    //         this.roundCounter++;
    //         this.runGame();
    //     }
    // }

    // showHand(playerIndex) {
    //     console.log(this.players[playerIndex].hand);
    //     let playerTurnName = this.players[playerIndex].name;
    //     $(".playerTurn").text(playerTurnName + " - Round " + this.roundCounter);
    //     for (let card = 0; card < 5; card++) {
    //         let numberInCard = this.players[playerIndex].hand[card].number;
    //         let suiteInCard = this.players[playerIndex].hand[card].suite;
    //         let valueInCard = this.players[playerIndex].hand[card].value;
    //         let displayCard = this.players[playerIndex].hand[card].image;
    //         $(".playerCard" + card).css("background-image", "url('" + displayCard + "')");
    //         // $('#cardplace1').css("background-image", "url('" + imgArray[0] + "')");
    //         $(".bottom" + card).text(valueInCard + " points");
    //     }
    //     console.log('Discard cards by using game.discardCards([array of indexes]). Pass in the object of each card you want to discard. For example, to discard the' +
    //         ' first two cards it would look like: game.discardCards([0,1])');
    // }
    render() {
        const { deckOfCards } = this.state;
        return (
            <div>
                {/* {cards} */}
            </div>
        )
    }
}

export default RunGame;