import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useParams, useNavigate } from 'react-router-dom';
import { requestAppointment } from '../../features/medicals/medicalAPI.js';
import { toast } from 'react-toastify';

function ReactCalendar() {
    const navigate = useNavigate();
    const today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    const [date, setDate] = useState(tomorrow);
    // eslint-disable-next-line no-unused-vars
    const [time, setTime] = useState();
    const [checkDate, setCheckDate] = useState(false);
    const [appointment, setAppointment] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [request, setRequest] = useState({});
    const patient = sessionStorage.getItem('userId');
    const { userId } = useParams();

    const onChange = date => {
        setDate(date);
        setCheckDate(date <= today);
        checkDateForAppointment();
        setAppointment(date.toLocaleDateString('en-US'));
    }

    function checkDateForAppointment() {
        if (!checkDate) {
            setAppointment(date.toLocaleDateString('en-US'));
        }
    }

    async function createAppointment(event) {
        event.preventDefault();
        const hours = document.getElementById('appt').value;
        setTime(hours);

        const newAppointment = {
            patient: patient,
            medical: userId,
            date: appointment,
            time: hours
        }
        const time = Number(newAppointment.time.split(':')[0]);
        const timeCheck = time >= 10 && time <= 19;

        if(timeCheck === false) {
            toast('Please select a period during the working hours of your medical professional', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return;
        }

        if (newAppointment.date !== '' && newAppointment.time !== '') {
            try {
                const patientAndMedical = await requestAppointment(userId, newAppointment);
                setRequest(patientAndMedical);
                toast(`You requested an appointment for ${appointment} at ${newAppointment.time} o'clock. Please wait for approval.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            navigate(`/users/patient/${patient}`);
            } catch (err) {
                console.log(err.message);
            }
        } else {
            toast('Please select a date and time', {
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
            <div className='calendar-container'>
                <Calendar
                    value={date}
                    onChange={onChange}
                />
            </div>
            <div className="date-info">
                <h5>Scheduling Information</h5>
                <p className='date-text'>Current date: {new Date().toLocaleDateString('en-US')}</p>
                {checkDate
                    ? <div>
                        <p className='date-text'><span className='selected'>Your desired date cannot be set for today or in the past. Please, choose another date.</span></p>
                        <p className='date-text'>What do you think about <span className='selected'>{tomorrow.toLocaleDateString('en-US')}</span>?</p>
                    </div>
                    : <div>
                        {!appointment
                            ? <div><p className='date-text'>Select appointment date from the calendar above: <span className='selected'>{appointment}</span></p></div>
                            : <div><p className='date-text'>Current appointment date: <span className='selected'>{date.toLocaleDateString('en-Us')}</span></p>
                            </div>
                        }
                    </div>
                }
                <div className="hours-container">
                    <label htmlFor="appt">Choose a time for your appointment:</label>
                    <input type="time" id="appt" name="appt"
                        min="10:00" max="19:00" required />
                    <small>Office hours are 10am to 7pm</small>
                </div>
                <button onClick={(event) => { createAppointment(event) }} type="submit" id='checkAppointmentBtn'>Request and appointment</button>
            </div>
        </>

    )
}

export default ReactCalendar;