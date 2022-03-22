import React from 'react';
import Navigation from '../Navigation/Navigation.js';
import Footer from '../Footer/Footer.js';
import Contact from '../Contact/Contact.js';
import '../../scss/style.css';

function FindDoctor() {
    return (
        <section id="find-doctor-container">
            <Navigation />
            <div className="find-doctor-div">
                <h2 id="find-doctor-h2">Find a Doctor</h2>
                <div className="search-field">
                    <form id="search-form">
                        <div className="search-doctor">
                            <label className="serach-label" for="search">Find your specialist:</label>
                            <input id="search-input" type="search" placeholder="Use our search tool and enter the name of a medical person, location or specialty..." required />
                        </div>
                        <button id="searchBtn">Submit</button>
                    </form>
                </div>
                <button className="requestBtn" type="submit" name="action">Request an appointment
                    <i className="material-icons right">send</i>
                </button>
                <Contact />
            </div>
            <Footer />
        </section>
    )
}

export default FindDoctor;