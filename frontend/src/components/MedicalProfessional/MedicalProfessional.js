import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { chooseMyDoctor, cancelMedical } from '../../features/auth/authAPI.js';

function MedicalProfessional({ medical }) {
  const isMedical = sessionStorage.getItem('role') === 'medical-professional';
  const userId = sessionStorage.getItem('userId');
  const medicalId = medical._id;
  const navigate = useNavigate();
  let hasDoctor = sessionStorage.getItem('hasDoctor');
  let myDoctor = sessionStorage.getItem('myDoctor');

  async function chooseADoctor(event) {
    event.preventDefault();
    try {
      const patient = await chooseMyDoctor(medicalId, userId);
      sessionStorage.setItem('hasDoctor', true);
      sessionStorage.setItem('myDoctor', medicalId);
      navigate(-1);
      return patient;
    } catch (err) {
      console.log(err.message)
    }
  }

  async function cancelMedicalAction(event) {
    event.preventDefault();
    try {
      const patient = await cancelMedical(medicalId, userId);
      sessionStorage.removeItem('hasDoctor');
      sessionStorage.removeItem('myDoctor');
      navigate(-1);
      return patient;
    } catch (err) {
      console.log(err.message)
    }
  }
  console.log('hasDoctor', hasDoctor);
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
              {hasDoctor
                ? <div>
                  {myDoctor === medical._id
                    ? <div><div className="card-action">
                      <Link onClick={cancelMedicalAction} to={`/users/patient/${userId}/cancel-my-medical-professional`} state={medical._id}>Cancel Service</Link>
                    </div>
                      <div className="card-action">
                        <Link to={`/medicals/request-appointment/${medical._id}`} state={medical._id}>Request an appointment</Link>
                      </div>
                      <div className="send-message">
                        <button className="sendMessageOption">Send Message</button>
                      </div>
                    </div>
                    : ""
                  }
                </div>
                : <div className="card-action">
                  {!isMedical
                  ? <div><Link onClick={chooseADoctor} to={`/users/patient/${userId}/choose-my-medical-professional`} state={medical._id}>Choose this specialist</Link></div>
                  : ""
                  }
                </div>
              }
            </div>
            : ""
          }
        </div>
      </div>
    </div>
  )
}

export default MedicalProfessional;