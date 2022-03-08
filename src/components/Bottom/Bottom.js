import React from 'react';
import '../Bottom/Bottom.css';

function Bottom() {
    return (
        <div class="parallax-container valign-wrapper">
            <div class="section no-pad-bot">
                <div class="container">
                    <div class="row center">
                        <h5 class="header col s12 bottom-heading">We are always there for you</h5>
                    </div>
                </div>
            </div>
            <div class="parallax"><img src={require('../../images/background3.jpg')} alt="Unsplashed background img 3" /></div>
        </div>
    )
}

export default Bottom;