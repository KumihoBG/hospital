import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { requestExamination, getMyExaminationResult, getImage, getImageFileName } from '../../features/examinations/examinationAPI';
import authService from '../../features/auth/authAPI.js';
const requestExamBtn = document.getElementById('requestExamBtn');
let completed = sessionStorage.getItem('isCompleted');

function Appointment({ appointment }) {
  const [medicalInfo, setMedicalInfo] = useState({});
  const [examinationId, setExaminationId] = useState('');
  const [filename, setFilename] = useState('');
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();  
  
  useEffect(() => {
    setMedicalInfo(appointment);
    getMyExaminationId();
    checkIfIsCompleted();
    checkMyExaminationResult(examinationId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment]);

  async function getMyExaminationId() {
    try {
      const examinationIdFetch = await authService.getMyExamination(userId);
      if (examinationIdFetch.length > 0) {
        setExaminationId(examinationIdFetch[0]);
        return examinationIdFetch;
      } 
    } catch (err) {
      console.log(err.message)
    }
  }

  async function checkMyExaminationResult(examinationId) {
    try {
        const myExaminationResult = await getMyExaminationResult(examinationId);
        if (myExaminationResult.length > 0) {
        const resultsArray = myExaminationResult[0].results;
        const resultIdFound = resultsArray[0];
        getMyResultsFileName(resultIdFound);
        }
    } catch (err) {
        console.log(err.message);
    }
}

  async function onRequestExamination(event) {
    event.preventDefault();

    const examRequest = {
      patient: appointment.patient,
      medical: appointment.medical,
      isCompleted: false,
      results: [],
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

  async function checkIfIsCompleted() {
    if (completed) {
        toast(`Your examination procedure is over. Check results below`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
    } else {
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
    }
  }

  async function getMyResults(event) {
    event.preventDefault();
      try {
          const file = await getImage(filename);
          console.log('file', file);
          sessionStorage.setItem('isCompleted', true);
          navigate(`/uploads/image/${filename}`);
          return file;
      } catch (err) {
          console.log(err.message);
      }
  }

  async function getMyResultsFileName(resultId) {
    try {
      const resultFileName = await getImageFileName(resultId);
      setFilename(resultFileName.filename);
    } catch (err) {
      console.log(err.message);
    }
  }
 
  return (
    <>
      {examinationId
        ? <div>
          <p id="no-appointments">Your examination has been completed</p>
          <div className="section-title">
            <h5>Results</h5>
            <button onClick={getMyResults} className="results-link" type="submit" alt="Patient Examination Results">View Results</button>
          </div>
        </div>
        : <div>
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
          {!examinationId
            ? <button id="requestExamBtn" type="submit" onClick={onRequestExamination}>Request examination</button>
            : <button id="disabledBtn-patient" style={{ disabled: "true" }}>Examination Requested</button>
          }
        </div>
      }

    </>
  )
}

export default Appointment;