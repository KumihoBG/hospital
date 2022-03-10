import React from 'react';
import { Link } from 'react-router-dom';
import '../IconSection/IconSection.css';

function IconSection() {
    return (
        <div class="container">
            <div class="section">
                <div class="row">
                    <div class="col s12 m4">
                        <div class="icon-block">
                            <h2 class="center green-icons"><i class="material-icons">healing</i></h2>
                            <Link className="icons-link" to="/staff" alt="Find the best specialist for you">Find a Doctor <i class="material-icons arrow" >keyboard_arrow_right</i></Link>

                            <p class="light">You do not need to come to us in person to find the right specialist for you. Use our search tool. We have medical professionals with extensive experience in various fields. Trust them, they will not let you down.</p>
                        </div>
                    </div>

                    <div class="col s12 m4">
                        <div class="icon-block">
                            <h2 class="center green-icons"><i class="material-icons">schedule</i></h2>
                            <Link className="icons-link" to="/staff" alt="Find the best specialist for you">Appointments <i class="material-icons arrow" >keyboard_arrow_right</i></Link>

                            <p class="light">Worried about a physical examination during the Covid-19 pandemic? Stop it! We have taken huge measures to protect you from infection - constant disinfection, wearing protective masks, keeping a physical distance, and limiting patients meeting each other.</p>
                        </div>
                    </div>

                    <div class="col s12 m4">
                        <div class="icon-block">
                            <h2 class="center green-icons"><i class="material-icons">assignment</i></h2>
                            <Link className="icons-link" to="/staff" alt="Find the best specialist for you">Examination Results <i class="material-icons arrow" >keyboard_arrow_right</i></Link>

                            <p class="light">You have undergone a medical examination and you need to pick up your results? You don't have to wait in line in front of the doctor's office. Your doctor will publish your results on your patient profile as soon as they are ready so you can see them online.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IconSection;