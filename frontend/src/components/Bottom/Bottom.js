import React from 'react';
import '../../scss/style.css';

function Bottom() {
    return (
        <div className="parallax-container valign-wrapper">
            <div className="section no-pad-bot">
                <div className="container">
                    <div className="row center">
                        <h5 className="header col s12 bottom-heading">We are always there for you</h5>
                    </div>
                </div>
            </div>
            <div className="parallax"><img src={require('../../images/background3.jpg')} alt="Unsplashed background img 3" /></div>
        </div>
    )
}

export default Bottom;