import React, { Component } from 'react';

class CardDeck extends Component() {
    constructor(props) {
        super(props);

    }


    card(value, name, suit, image) {
        this.value = value;
        this.name = name;
        this.suit = suit;
        this.image = "images/" + this.name + this.suit + ".png";
    }


    deck() {
        this.names = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'tem', 'jack', 'queen', 'king'];
        this.suits = ['H', 'D', 'S', 'C'];

        for (let s = 0; s < this.suits.length; s++) {
            for (let n = 0; n < this.names.length; n++) {
                const allCards = new card(this.value = n + 1, this.names[n], this.suits[s], this.image)
                if (allCards.value > 10) {
                    allCards.value = 10;
                }
                this.cards.push(allCards);
            }
        }
        return cardDeck;
    }

}

export default CardDeck;