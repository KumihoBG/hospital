import React from 'react';
import { Link } from 'react-router-dom';
import '../MedicalProfessional/MedicalProfessional.css';

function MedicalProfessional() {
  const medic = {
    fullName: 'John Smith',
    department: 'Orthopedic Surgeon',
    areas: 'Hip surgery, Hip replacement, Hip fracture surgery, Hip replacement revision, Knee replacement, Knee reconstruction',
    location: 'Sofia'
  }

  return (
    <div className="row">
    <div className="col s12 m7">
      <div className="card">
        <div className="card-image">
          <img src={require('../../images/doctor.jpg')} alt="Medical Professional"/>
          <span className="card-title">{medic.fullName}</span>
          <i className="material-icons stars">grade</i>
          <i className="material-icons stars">grade</i>
          <i className="material-icons stars">grade</i>
        </div>
        <div className="card-content">
          <p><span className="description-paragraph">Department:</span> {medic.department}</p>
          <p><span className="description-paragraph">Areas of Focus:</span> {medic.areas}</p>
          <p><span className="description-paragraph">Practice location:</span> {medic.location}</p>
        </div>
        <div className="card-action">
          <Link to={`/request-appointment/${medic.medicalId}`}>Request an appointment</Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MedicalProfessional;