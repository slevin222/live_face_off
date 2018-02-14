

class CardDeck extends Component() {
    constructor(props) {
        super(props);
        this.cards = [];

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

        for (let s = 0; s < this.suits.length; s++) {
            for (let n = 0; n < this.names.length; n++) {
                const allCards = new card(this.value = n + 1, this.names[n], this.suits[s], this.image)
                if (allCards.value > 10) {
                    allCards.value = 10;
                }
                this.cards.push(allCards);
            }
        }
        return this.cards;
    }

}

export default CardDeck;