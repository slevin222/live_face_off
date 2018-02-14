

export default function (value, name, suit, image) {

    this.value = value;
    this.name = name;
    this.suit = suit;
    this.image = "images/" + this.name + this.suit + ".png";
    return card;
}