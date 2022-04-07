import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';
import { approveAppointment } from '../../features/medicals/medicalAPI.js';

function AppointmentMedical({ appointment }) {
  const [patientInfo, setPatientInfo] = useState({});
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    setPatientInfo(appointment);
    if(appointment.isApproved === 'Yes') {
      console.log('isApproved', appointment.isApproved);
      setApproved(true);
    }
  }, [appointment]);

  async function onApprove(event) {
    event.preventDefault();
    try {
      const updatedAppointment = {
        patient: appointment.patient,
        medical: appointment.medical,
        date: appointment.date,
        time: appointment.time,
        isApproved: 'Yes',
      };
      await approveAppointment(appointment._id, updatedAppointment);
      toast('Appointment successfully approved!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch(err) {
      console.log(err.message);
      toast(`${err.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

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
        <br/>
      </div>
      {!approved
      ? <button id="approveUserBtn" type="submit" onClick={onApprove}>Approve appointment</button>
      : <button id="disabledBtn" style={{ disabled: "true"}}>Approved</button>
      } 
    </>
  )
}

export default AppointmentMedical;