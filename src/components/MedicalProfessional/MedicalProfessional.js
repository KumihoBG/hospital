import React from 'react';
import { Link } from 'react-router-dom';


function MedicalProfessional({medic}) {
  return (
    <div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src="/images/doctor.jpg" alt="Medical Professional"/>
          <span class="card-title">{medic.fullName}</span>
        </div>
        <div class="card-content">
          <p>{medic.department}</p>
          <p>{medic.location}</p>
        </div>
        <div class="card-action">
          <Link to={`/request-appointment/${medic.medicalId}`}>Choose Medical Professional</Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MedicalProfessional;