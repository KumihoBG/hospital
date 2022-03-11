import React from 'react';
import '../Footer/Footer.css';
import Icons from '../Icons/Icons.js';
import Search from '../Search/Search.js';

function Footer() {
    return (
        <footer class="page-footer teal">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">NewLife Hospital</h5>
                        <p class="grey-text text-lighten-4">We are a not-for-profit organization. We will appreciate every donation you make to continue our development and the research that our scientists do for the benefit of society.</p>
                        <button id="donation">Make a donation</button>
                    </div>
                    <div class="col l3 s12">
                        <h5 class="white-text">About Us</h5>
                        <ul className="footer-ul">
                            <li><a class="white-text" href="#!">Find a Doctor</a></li>
                            <li><a class="white-text" href="#!">Locations & Directions</a></li>
                            <li><a class="white-text" href="#!">Contact Us</a></li>
                            <li><a class="white-text" href="#!">Make an appointment</a></li>
                        </ul>
                    </div>
                    <div class="col l3 s12">
                        <h5 class="white-text">Site Information & Policies</h5>
                        <ul className="footer-ul">
                            <li><a class="white-text" href="#!">Privacy Policy</a></li>
                            <li><a class="white-text" href="#!">Send Us Feedback</a></li>
                            <li><a class="white-text" href="#!">Website Terms of Use</a></li>
                            <li><a class="white-text" href="#!">Licensing</a></li>
                        </ul>
                    </div>
                </div>
                <p id="follow">Follow NewLife Hospital</p>
                <div className="footer-small">
                    <Icons />
                    <Search />
                </div>

            </div>
            <div class="footer-copyright">
                <div class="container">
                    Made by <a class="brown-text text-lighten-3" href="http://materializecss.com">Materialize</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;