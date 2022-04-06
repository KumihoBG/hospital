import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';

function AppointmentMedical({ appointment }) {
  const [patientInfo, setPatientInfo] = useState({});

  useEffect(() => {
    setPatientInfo(appointment);
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
          <Avatar className="avatar" alt="Doctor" src={patientInfo.patient?.imageUrl} sx={{ width: 150, height: 150 }} />
        </div>
        <div>
          <p>
            <span id="full-name">{patientInfo.patient?.name}</span><br />
            <span id="username">Username: {patientInfo.patient?.username}</span><br />
            <span id="email">Email: {patientInfo.patient?.email}</span><br />
            <span>{patientInfo.patient?.gender} | {patientInfo.patient?.age}</span><br />
          </p>
        </div>
      </div>
    </>
  )
}

export default AppointmentMedical;