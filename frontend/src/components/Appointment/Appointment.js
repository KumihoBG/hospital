import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';

function Appointment({ appointment }) {
  const [medicalInfo, setMedicalInfo] = useState({});

  useEffect(() => {
    setMedicalInfo(appointment);
  }, [appointment]);

  return (
    <>
      <li className="card-content">
        <p><span className="description-paragraph">Date:</span> {appointment.date}</p>
        <p><span className="description-paragraph">Time:</span> {appointment.time}</p>
        <p><span className="description-paragraph">Approved:</span> {appointment.isApproved}</p>
      </li>
      <div className="patient-info">
        <div>
          <Avatar className="avatar" alt="Doctor" src={medicalInfo.medical?.imageUrl} sx={{ width: 150, height: 150 }} />
        </div>
        <div>
          <p>
            <span id="full-name">{medicalInfo.medical?.name}</span><br />
            <span id="username">Username: {medicalInfo.medical?.username}</span><br />
            <span id="email">Email: {medicalInfo.medical?.email}</span><br />
            <span>{medicalInfo.medical?.gender} | {medicalInfo.medical?.age}</span><br />
          </p>
        </div>
      </div>
    </>
  )
}

export default Appointment;