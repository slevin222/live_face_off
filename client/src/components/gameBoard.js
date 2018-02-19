import React, { Component } from 'react';
import '../assets/css/gameBoard.css';
import twoH from '../assets/images/2H.png';
import twoD from '../assets/images/2D.png';
import twoC from '../assets/images/2C.png';
import twoS from '../assets/images/2S.png';
import threeH from '../assets/images/3H.png';
import threeD from '../assets/images/3D.png';
import threeC from '../assets/images/3C.png';
import threeS from '../assets/images/3S.png';
import fourH from '../assets/images/4H.png';
import fourD from '../assets/images/4D.png';
import fourC from '../assets/images/4C.png';
import fourS from '../assets/images/4S.png';
import fiveH from '../assets/images/5H.png';
import fiveD from '../assets/images/5D.png';
import fiveC from '../assets/images/5C.png';
import fiveS from '../assets/images/5S.png';
import sixH from '../assets/images/6H.png';
import sixD from '../assets/images/6D.png';
import sixC from '../assets/images/6C.png';
import sixS from '../assets/images/6S.png';
import sevenH from '../assets/images/7H.png';
import sevenD from '../assets/images/7D.png';
import sevenC from '../assets/images/7C.png';
import sevenS from '../assets/images/7S.png';
import eightH from '../assets/images/8H.png';
import eightD from '../assets/images/8D.png';
import eightC from '../assets/images/8C.png';
import eightS from '../assets/images/8S.png';
import nineH from '../assets/images/9H.png';
import nineD from '../assets/images/9D.png';
import nineC from '../assets/images/9C.png';
import nineS from '../assets/images/9S.png';
import tenH from '../assets/images/10H.png';
import tenD from '../assets/images/10D.png';
import tenC from '../assets/images/10C.png';
import tenS from '../assets/images/10S.png';
import jackH from '../assets/images/JH.png';
import jackD from '../assets/images/JD.png';
import jackC from '../assets/images/JC.png';
import jackS from '../assets/images/JS.png';
import queenH from '../assets/images/QH.png';
import queenD from '../assets/images/QD.png';
import queenC from '../assets/images/QC.png';
import queenS from '../assets/images/QS.png';
import kingH from '../assets/images/KH.png';
import kingD from '../assets/images/KD.png';
import kingC from '../assets/images/KC.png';
import kingS from '../assets/images/KS.png';
import aceH from '../assets/images/AH.png';
import aceD from '../assets/images/AD.png';
import aceC from '../assets/images/AC.png';
import aceS from '../assets/images/AS.png';
import RunGame from './runGame';


class GameBoard extends Component {
    constructor(props) {
        super(props)
        console.log("GameBoard props :", props);
    }
    render() {
        return (
            <div className="gameArea">

                <div className="playerCard0" style={{ backgroundImage: "url(" + nineS + ")" }}></div>
                <div className="playerCard1" style={{ backgroundImage: "url(" + sevenS + ")" }}></div>
                <div className="playerCard2" style={{ backgroundImage: "url(" + jackC + ")" }}></div>
                <div className="playerCard3" style={{ backgroundImage: "url(" + twoH + ")" }}></div>
                <div className="playerCard4" style={{ backgroundImage: "url(" + threeC + ")" }}></div>
                <div className="bottomInfo">
                    <div className="bottom0">9 Points</div>
                    <div className="bottom1">10 Points</div>
                    <div className="bottom2">10 Points</div>
                    <div className="bottom3">2 Points</div>
                    <div className="bottom4">3 Points</div>
                </div>
                <div className="footer">
                    <button className="btn discardBtn green-accent-3" type="submit">Discard Cards</button>
                </div>
            </div >
        );
    }
}

export default GameBoard;