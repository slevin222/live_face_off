import React from 'react';
import '../assets/css/about.css';
import familyphoto from '../assets/images/familyphoto.jpg'
import github from '../assets/images/github.svg'
import portfolio from '../assets/images/portfolio.png'
// import LandingBG from '../assets/images/gameBG3.png'

// let style = {
//     backgroundSize: 'contain',
//     backgroundImage: `url(${LandingBG})`
// }

export default (props) => {

    return (
        <div className='aboutUs'>
            <div className="row">
                <div className="col s6 offset-s3">
                    <h3 className="title center center-align">Meet the Team!</h3>
                </div>
            </div>
            <div className="row imageRow">
                <div className="col l3 s6">
                    <div className="row">
                        <h3 className="frontAndBack center center-align">Front End Developers</h3>
                        <div className="divider black"></div>
                        <div className="aboutUsText col s12">
                            <h4 className="aboutUsNames center center-align">Shawn Levin</h4>
                            <p>On this project, I was most excited to utilize more modern technologies such as React and Materialize CSS. The most challenging portion was implementing the web cam on each of the game modes seperately. We utilized a WebRTC api from TokBox, that worked especially well with React. Paul and I worked diligently together on the frontend splitting the workload, but also helping each other along the way.</p>
                            <div className="icons center center-align col s12">
                                <a href="https://github.com/slevin222" target="_blank"><i className="contactIcon fab fa-github"></i></a>
                                <a href="https://shawndlevin.com" target="_blank"><i className="contactIcon fas fa-id-card"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="divider black"></div>
                    <div className="row">
                        <div className="aboutUsText col s12">
                            <h4 className="aboutUsNames center center-align">Paul Lee</h4>
                            <p>It was an awesome experience working with this team of talented developers and I'm very proud of how we collaborated to bring this application to life. Implementing React and Redux for our front end was challenging but it was an invaluable experience.</p>
                        </div>
                        <div className="icons center center-align col s12">
                            <a href="https://github.com/fedrius" target="_blank"><i className="contactIcon fab fa-github"></i></a>
                            <a href="https://paulmlee.live" target="_blank"><i className="contactIcon fas fa-id-card"></i></a>
                        </div>
                    </div>
                </div>
                <div className="imageContainer col l6 s12">
                    <img src={familyphoto} className="aboutUsImage col s12 z-depth-5" />
                    <p className="figCaptionText center center-align"><strong>From left to right:</strong> Paul Lee, Khaleel Younis, Shawn Levin, Crystal Navarro</p>
                </div>
                <div className="col s6 l3">
                    <div className="row">
                        <h3 className="frontAndBack center center-align">Back End Developers</h3>
                        <div className="divider black"></div>
                        <div className="aboutUsText col s12">
                            <h4 className="aboutUsNames center center-align">Khaleel Younis</h4>
                            <p>I had the pleasure to work with Node.js, Express, Passport MongoDB, Socket.io and plenty more to build, alongside my partner Crystal, the backend portion of Live Face Off. The hardest, and most entertaining, challenge was correctly implementing the webcam and having it communicate properly with the back end.</p>
                        </div>
                        <div className="icons center center-align col s12">
                            <a href="https://github.com/stallenvp" target="_blank"><i className="contactIcon fab fa-github"></i></a>
                            <a href="https://khaleelyounis.com" target="_blank"><i className="contactIcon fas fa-id-card"></i></a>
                        </div>
                    </div>
                    <div className="divider black"></div>
                    <div className="row">
                        <div className="aboutUsText col s12">
                            <h4 className="aboutUsNames center center-align">Crystal Navarro</h4>
                            <p>During this project, I had the wonderful opportunity to learn and implement: Node.js, Express, Mongo DB, Socket.io, and a bit of React. Working with these guys was a great experience because individuality did not exist. We all worked collectively and learned a vast amount of concepts from the front to the back end. My greatest challenge was learning how the technologies in the MERN stack tied in together. Overcoming our bugs and walls was such a great pay off. There is no other way I would have wanted to learn.</p>
                        </div>
                        <div className="icons center center-align col s12">
                            <a href="https://github.com/xoxocrystyle" target="_blank"><i className="contactIcon fab fa-github"></i></a>
                            <a href="https://crystalnavarro.com" target="_blank"><i className="contactIcon fas fa-id-card"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}