import React from 'react'

function Parallax() {
    return (
        <div className="parallax-container valign-wrapper">
            <div className="section no-pad-bot">
                <div className="container">
                    <div className="row center">
                        <h5 className="header col s12 bottom-heading">You come first</h5>
                    </div>
                </div>
            </div>
            <div className="parallax"><img src={require('../../images/background2.jpg')} alt="Unsplashed background img 2" /></div>
        </div>
    )
}

export default Parallax;