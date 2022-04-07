import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';
import { requestExamination } from '../../features/examinations/examinationAPI';
const requestExamBtn = document.getElementById('requestExamBtn');

function Appointment({ appointment }) {
  const [medicalInfo, setMedicalInfo] = useState({});
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    setMedicalInfo(appointment);
    if (appointment.isApproved === "Yes") {
      toast('You have approved appointments. Check status.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else if (appointment.isApproved === "No") {
      requestExamBtn.style.display = "none";
    }

  }, [appointment]);

  async function onRequestExamination(event) {
    event.preventDefault();

    const examRequest = {
      patient: appointment.patient,
      medical: appointment.medical,
      isCompleted: false,
      results: null
    }

    try {
      const newExamination = await requestExamination(examRequest);
      toast('Examination request sent', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setRequested(true);
      return newExamination;
    } catch (err) {
      console.log(err.message);
      toast(`${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
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
      {!requested
      ? <button id="requestExamBtn" type="submit" onClick={onRequestExamination}>Request examination</button>
      : <button id="disabledBtn-patient" style={{ disabled: "true"}}>Requested</button>
      } 
    </>
  )
}

export default Appointment;