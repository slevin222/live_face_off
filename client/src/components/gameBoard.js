import React from 'react';
import '../assets/css/gameBoard.css';
import nineSpades from '../assets/images/9S.png';
import sevenSpades from '../assets/images/7S.png';
import jackClubs from '../assets/images/JC.png';
import twoHearts from '../assets/images/2H.png';
import threeClubs from '../assets/images/3C.png';

export default props => {
    return (
        <div className="gameArea col s10">

            <div className="playerCard0" style={{ backgroundImage: "url(" + nineSpades + ")" }}></div>
            <div className="playerCard1" style={{ backgroundImage: "url(" + sevenSpades + ")" }}></div>
            <div className="playerCard2" style={{ backgroundImage: "url(" + jackClubs + ")" }}></div>
            <div className="playerCard3" style={{ backgroundImage: "url(" + twoHearts + ")" }}></div>
            <div className="playerCard4" style={{ backgroundImage: "url(" + threeClubs + ")" }}></div>

            <div className="bottomInfo">
                <div className="bottom0">9 Points</div>
                <div className="bottom1">10 Points</div>
                <div className="bottom2">10 Points</div>
                <div className="bottom3">2 Points</div>
                <div className="bottom4">3 Points</div>
            </div>
            <div className="footer">
                <button className="discardBtn" type="submit">Discard Cards</button>
            </div>
        </div>
    );
}