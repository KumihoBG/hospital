import React from 'react';
import Navigation from '../Navigation/Navigation.js';
import MedicalProfessional from '../MedicalProfessional/MedicalProfessional.js';
import Footer from '../Footer/Footer.js';
import '../MedicalProfessionalCollection/MedicalProfessionalCollection.css';
import PatientProfile from '../PatientProfile/PatientProfile.js';

function MedicalProfessionalCollection() {
    return (
        <div className="staff-container">
            <Navigation />
            <h4 className="staff-title">Doctors & Medical Staff</h4>
            <h6>Our specialists have extensive knowledge in all areas of medicine.</h6>
            <ul className="collection">
                <li className="collection-item avatar">
                    <MedicalProfessional />
                </li>
                <li className="collection-item avatar">
                    <MedicalProfessional />
                </li>
                <li className="collection-item avatar">
                    <MedicalProfessional />
                </li>
                <li className="collection-item avatar">
                    <MedicalProfessional />
                </li>
            </ul>
            <PatientProfile />
            <Footer />
        </div>
    )
}

export default MedicalProfessionalCollection;