import React, { Component } from 'react';
// import cardDeck from './cardDeck';

class RunGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deckOfCards: [],
            player1Hand: [],
            player2Hand: [],
            player3Hand: [],
            player4Hand: [],
            discardPile: []
        }

    }

    componentDidMount() {
        this.deck();
    }

    card(value, name, suit, image) {
        this.value = value;
        this.name = name;
        this.suit = suit;
        this.image = "images/" + this.name + this.suit + ".png";

    }


    deck() {
        this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.suits = ['H', 'D', 'S', 'C'];
        const cards = [];
        for (let s = 0; s < this.suits.length; s++) {
            for (let n = 0; n < this.names.length; n++) {
                const allCards = new card(this.value = n + 1, this.names[n], this.suits[s])
                if (allCards.value > 10) {
                    allCards.value = 10;
                }
                cards.push(allCards);
            }
        }

        this.setState({
            deckOfCards: cards
        });

    }

    render() {
        const { deckOfCards } = this.state;
        console.log('cards :', deckOfCards);
        return (
            <div>
                Hello{/* {cards} */}
            </div>
        )
    }

    // shuffleDeck() {
    //     let counter = this.cards.length;
    //     while (counter > 0) {
    //         let index = Math.floor(Math.random() * counter);
    //         counter--;
    //         let temp = this.cards[counter];
    //         this.cards[counter] = this.cards[index];
    //         this.cards[index] = temp;
    //     }
    //     return this.cards;
    // }

    // deal(currentPlayer) {
    //     this.shuffleDeck();
    //     currentPlayer.hand.push(this.deck.cards.shift());
    // }

    // dealInitialHand() {
    //     let cardCounter = 5;
    //     for (let cardCountIndex = 0; cardCountIndex < cardCounter; cardCountIndex++) {
    //         for (let playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
    //             this.deal(this.players[playerIndex]);
    //         }
    //     }
    // }


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
}

export default RunGame;