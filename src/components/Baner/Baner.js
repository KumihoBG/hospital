import React from 'react';
import '../Baner/Baner.css';

function Baner() {
    return (
        <div>
            <div id="index-banner" class="parallax-container">
                <div class="section no-pad-bot">
                    <div class="container">
                        <br />
                        <h1 id="main-heading-h1" class="header center teal-text text-lighten-2">Our Commitment to Safe Care</h1>
                        <div class="row center">
                            <h5 class="header col s12 main-heading">Because your Life matters</h5>
                        </div>
                        <div class="row center">
                            <a href="http://materializecss.com/getting-started.html" id="download-button" class="btn-large waves-effect waves-light teal lighten-1">FIND A DOCTOR</a>
                        </div>
                        <br />

                    </div>
                </div>
                <div class="parallax"><img src="background1.jpg" alt="Unsplashed background img 1" /></div>
            </div>
        </div>
    )
}

export default Baner;