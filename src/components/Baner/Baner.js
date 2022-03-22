import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/style.css';

function Baner() {
    return (
        <div>
            <div id="index-banner" className="parallax-container">
                <div className="section no-pad-bot">
                    <div className="container">
                        <br />
                        <h1 id="main-heading-h1" className="header center teal-text text-lighten-2">Our Commitment to Health Care</h1>
                        <div className="row center">
                            <h5 className="header col s12 main-heading">Because your Life matters</h5>
                        </div>
                        <div className="row center">
                        <Link to="/staff" alt="Find the best specialist for you" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">FIND A DOCTOR</Link>
                        </div>
                        <br />
                    </div>
                </div>
                <div className="parallax"><img src={require('../../images/background1.jpg')} alt="Unsplashed background img 1" /></div>
            </div>
        </div>
    )
}

export default Baner;