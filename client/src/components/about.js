import React from 'react';
import '../assets/css/about.css';
import familyphoto from '../assets/images/familyphoto.jpg'
import github from '../assets/images/github.svg'
import portfolio from '../assets/images/portfolio.png'

export default (props) => {
    return (
        <div className='aboutUs'>
            <div className="row">
                <div className="col s6 offset-s3">
                    <h3 className="title center center-align">Meet the Team!</h3>
                </div>
            </div>
            <div className="row imageRow">
                <div className="col s3">
                    <div className="row">
                        <h3 className="frontAndBack center center-align">Front End Developers</h3>
                        <div className="divider black"></div>
                        <div className="aboutUsText col s12">
                            <h4 className="aboutUsNames center center-align">Shawn Levin</h4>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, veniam. Aperiam similique, illo sed accusamus, quis laborum distinctio, inventore possimus quasi dolor officiis molestiae veritatis debitis cum. Nisi, amet eaque.</p>
                            <div className="icons center center-align col s12">
                                <a href="https://github.com/stallenvp" target="_blank"><i className="contactIcon fab fa-github"></i></a>
                                <a href="https://github.com/stallenvp" target="_blank"><i className="contactIcon fas fa-id-card"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="divider black"></div>
                    <div className="row">
                        <div className="aboutUsText col s12">
                            <h4 className="aboutUsNames center center-align">Paul Lee</h4>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, veniam. Aperiam similique, illo sed accusamus, quis laborum distinctio, inventore possimus quasi dolor officiis molestiae veritatis debitis cum. Nisi, amet eaque.</p>
                        </div>
                        <div className="icons center center-align col s12">
                                <a href="https://github.com/stallenvp" target="_blank"><i className="contactIcon fab fa-github"></i></a>
                                <a href="https://github.com/stallenvp" target="_blank"><i className="contactIcon fas fa-id-card"></i></a>
                            </div>
                    </div>
                </div>
                <div className="imageContainer col s6">
                    <img src={familyphoto} className="aboutUsImage col s12 z-depth-5" />
                    <p className="figCaptionText center center-align"><strong>From left to right:</strong> Paul Lee, Khaleel Younis, Shawn Levin, Crystal Navarro</p>
                </div>
                <div className="col s3">
                    <div className="row">
                        <h3 className="frontAndBack center center-align">Back End Developers</h3>
                        <div className="divider black"></div>
                        <div className="aboutUsText col s12">
                            <h4 className="aboutUsNames center center-align">Khaleel Younis</h4>
                            <p>I had the pleasure to work with Node.js, Express, Passport MongoDB, Socket.io and plenty more to build, alongside my partner Crystal, the backend portion of Live Face Off. The hardest, and most entertaining, challenge was correctly implementing the webcam and having it communicate properly with the back end. </p>
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
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, veniam. Aperiam similique, illo sed accusamus, quis laborum distinctio, inventore possimus quasi dolor officiis molestiae veritatis debitis cum. Nisi, amet eaque.</p>
                        </div>
                        <div className="icons center center-align col s12">
                                <a href="https://github.com/stallenvp" target="_blank"><i className="contactIcon fab fa-github"></i></a>
                                <a href="https://github.com/stallenvp" target="_blank"><i className="contactIcon fas fa-id-card"></i></a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}