import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';
import { checkForAppointment } from '../../features/medicals/medicalAPI.js';
const approveUserBtn = document.getElementById('approveUserBtn');

function AppointmentMedical({ appointment }) {
  const [patientInfo, setPatientInfo] = useState({});

  useEffect(() => {
    setPatientInfo(appointment);
  }, [appointment]);

  if(appointment.isApproved === "Yes") {
    approveUserBtn.textContent = 'Approved';
    approveUserBtn.disabled = true;
    approveUserBtn.style.backgroundColor = '#D3D3D3';
    approveUserBtn.style.cursor = 'not-allowed';
  }

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
      await checkForAppointment(appointment._id, updatedAppointment);
      toast('Appointment approved successfully!', {
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
        <button id="approveUserBtn" type="submit" onClick={onApprove}>Approve appointment</button>
    </>
  )
}

export default AppointmentMedical;