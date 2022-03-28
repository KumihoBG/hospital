import React from 'react';
import { Link } from 'react-router-dom';

function MedicalProfessional({ medical }) {
  const userId = sessionStorage.getItem('userId');

  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
          <div className="card-image">
            <img src={`${medical.imageUrl}`} alt="Medical Professional" />
            <i className="material-icons stars">grade</i>
            <i className="material-icons stars">grade</i>
            <i className="material-icons stars">grade</i>
          </div>
          <div className="card-content">
            <p><span className="description-paragraph">Name:</span> {medical.name}</p>
            <p><span className="description-paragraph">Department:</span> {medical.department}</p>
            <p><span className="description-paragraph">Areas of Focus:</span> {medical.areas}</p>
            <p><span className="description-paragraph">Practice location:</span> {medical.practiceLocation}</p>
          </div>
          {userId
            ? <div>
              <div className="card-action">
                <Link to={`/request-appointment/${medical._id}`} state={medical._id}>Request an appointment</Link>
              </div>
              <div className="card-action">
                <Link to={`/choose-medical/${medical._id}`} state={medical._id}>Choose this specialist</Link>
              </div>
            </div>
            : ""
          }
        </div>
      </div>
    </div>
  )
}

export default MedicalProfessional;