import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom';
// import { chooseMyDoctor, cancelMedical } from '../../features/auth/authAPI.js';

function Patient({ patient }) {
  const userId = sessionStorage.getItem('userId');
  // const medicalId = patient._id;
  // const navigate = useNavigate();
  // let hasDoctor = sessionStorage.getItem('hasDoctor');
  // let myDoctor = sessionStorage.getItem('myDoctor');

  // async function chooseADoctor(event) {
  //   event.preventDefault();
  //   try {
  //     const patient = await chooseMyDoctor(medicalId, userId);
  //     sessionStorage.setItem('hasDoctor', true);
  //     sessionStorage.setItem('myDoctor', medicalId);
  //     navigate(-1);
  //     return patient;
  //   } catch (err) {
  //     console.log(err.message)
  //   }
  // }

  // async function cancelMedicalAction(event) {
  //   event.preventDefault();
  //   try {
  //     const patient = await cancelMedical(medicalId, userId);
  //     sessionStorage.removeItem('hasDoctor');
  //     sessionStorage.removeItem('myDoctor');
  //     navigate(-1);
  //     return patient;
  //   } catch (err) {
  //     console.log(err.message)
  //   }
  // }

  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
          <div className="card-image">
            <img src={`${patient.imageUrl}`} alt="Patient" />
          </div>
          <div className="card-content">
            <p><span className="description-paragraph">Id:</span> {patient._id}</p>
            <p><span className="description-paragraph">Name:</span> {patient.name}</p>
            <p><span className="description-paragraph">Email:</span> {patient.email}</p>
            <p><span className="description-paragraph">Age:</span> {patient.age}</p>
            <p><span className="description-paragraph">Gender:</span> {patient.gender}</p>
            <p><span className="description-paragraph">Address:</span> {patient.address}</p>
            <p><span className="description-paragraph">Phone:</span> {patient.phone}</p>

          </div>

          <div><div className="card-action">
            <Link to={`/users/patient/${userId}/cancel-my-medical-professional`}>Accept Cancelation Request</Link><br />
            <Link to={{pathname: `/my-patients/patient/${patient._id}`, state: {patientId: patient._id}}}>View Profile</Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Patient;