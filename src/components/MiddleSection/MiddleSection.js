import React from 'react';

function MiddleSection() {
    return (
        <div id="locations-middle-section" className="container">
            <div className="section">
                <div className="row">
                    <div className="col s12 center">
                        <h3><i className="mdi-content-send brown-text"></i></h3>
                        <h4>Locations and Directions</h4>
                        <h6>You can find departments of our hospital in three of the main cities in Bulgaria.</h6>
                        <div className="locations">
                            <div className="hospital-container">
                                <img id="sofia" className="sofia" alt="Our Hospital in Sofia city" src={require('../../images/sofia.jpg')} />
                                <button>Sofia</button>
                            </div>
                            <div className="hospital-container">
                                <img id="plovdiv" className="plovdiv" alt="Our Hospital in Plovdiv city" src={require('../../images/plovdiv.jpg')} />
                                <button>Plovdiv</button>
                            </div>
                            <div className="hospital-container">
                                <img id="burgas" className="burgas" alt="Our Hospital in Burgas city" src={require('../../images/burgas.jpg')} />
                                <button>Burgas</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiddleSection;