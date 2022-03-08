import React from 'react'

function Parallax() {
    return (
        <div class="parallax-container valign-wrapper">
            <div class="section no-pad-bot">
                <div class="container">
                    <div class="row center">
                        <h5 class="header col s12 bottom-heading">You come first</h5>
                    </div>
                </div>
            </div>
            <div class="parallax"><img src={require('../../images/background2.jpg')} alt="Unsplashed background img 2" /></div>
        </div>
    )
}

export default Parallax;