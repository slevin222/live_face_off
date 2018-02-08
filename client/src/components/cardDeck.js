import React, { Component } from 'react';

export default class CardDeck extends Component() {

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
                const allCards = new card(this.value = n + 1, this.names[n], this.suits[s], this.image)
                if (allCards.value > 10) {
                    allCards.value = 10;
                }
                cards.push(allCards);
            }
        }
        return cards;
    }
    deck(card);

    shuffleDeck() {
        let counter = this.deck.cards.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;
            let temp = this.deck.cards[counter];
            this.deck.cards[counter] = this.deck.cards[index];
            this.deck.cards[index] = temp;
        }
        return this.deck.cards;
    }

}
