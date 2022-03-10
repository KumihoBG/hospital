import React from 'react';
import { Link } from 'react-router-dom';
import '../Baner/Baner.css';

function Baner() {
    return (
        <div>
            <div id="index-banner" class="parallax-container">
                <div class="section no-pad-bot">
                    <div class="container">
                        <br />
                        <h1 id="main-heading-h1" class="header center teal-text text-lighten-2">Our Commitment to Health Care</h1>
                        <div class="row center">
                            <h5 class="header col s12 main-heading">Because your Life matters</h5>
                        </div>
                        <div class="row center">
                        <Link to="/staff" alt="Find the best specialist for you" id="download-button" class="btn-large waves-effect waves-light teal lighten-1">FIND A DOCTOR</Link>
                        </div>
                        <br />
                    </div>
                </div>
                <div class="parallax"><img src={require('../../images/background1.jpg')} alt="Unsplashed background img 1" /></div>
            </div>
        </div>
    )
}

export default Baner;