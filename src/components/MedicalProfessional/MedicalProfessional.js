import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { chooseMyDoctor } from '../../features/auth/authAPI.js';

function MedicalProfessional({ medical }) {
  const userId = sessionStorage.getItem('userId');
  const medicalId = medical._id;
  const navigate = useNavigate();
  const hasDoctor = sessionStorage.getItem('hasDoctor');
  const myDoctor = sessionStorage.getItem('myDoctor');

  useEffect(() => {
    if (hasDoctor === 'true') {
      navigate('/medicals');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function chooseADoctor() {
    try {
      const patient = await chooseMyDoctor(medicalId, userId);
      sessionStorage.setItem('hasDoctor', true);
      sessionStorage.setItem('myDoctor', medicalId);
      return patient;
    } catch (err) {
      console.log(err.message)
    }
  }

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
                      <Link onClick={chooseADoctor} to={`/patient/${userId}/my-medical-professional`} state={medical._id}>Cancel Service</Link>
                    </div>
                      <div className="card-action">
                        <Link to={`/request-appointment/${medical._id}`} state={medical._id}>Request an appointment</Link>
                      </div>
                    </div>
                    : ""}
                </div>
                : <div className="card-action">
                  <Link onClick={chooseADoctor} to={`/patient/${userId}/my-medical-professional`} state={medical._id}>Choose this specialist</Link>
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