import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { deleteSingleMedical, getMedicalProfile } from '../../features/auth/authAPI';
import { checkForAppointment, getMyExaminations } from '../../features/medicals/medicalAPI.js';
import { getMyAppointment } from '../../features/appointments/appointmentsAPI.js';
import { toast } from 'react-toastify';
import { getMyExaminationStatus } from '../../features/examinations/examinationAPI';
import AppointmentMedical from '../AppointmentMedical/AppointmentMedical.js';

function PublicMedicalProfile() {
    const { userId } = useParams();
    const { medicalId } = useParams();
    const [profile, setProfile] = useState([]);
    const isMedical = sessionStorage.getItem('role') === 'medical-professional';
    const checkMedical = isMedical === true;
    const [myAppointments, setMyAppointments] = useState([]);
    const [examinationId, setExaminationId] = useState('');
    const [isCompleted, setCompleted] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const { user } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        getMedicalProfileInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getMedicalProfileInfo = async () => {
        try {
            const singleProfile = await getMedicalProfile(userId || medicalId);
            setProfile(singleProfile);
        } catch (err) {
            console.log(err.message)
        }
    }

    function setChatName() {
        if (profile.name) {
            sessionStorage.setItem('chatName', profile.name);
        }
    }

    async function onDeleteMedical() {
        try {
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('chatName');
            await deleteSingleMedical(profile._id);

            toast('Medical account deleted successfully! Redirecting to home page', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setTimeout(() => {
                window.location.replace('/home');
            }, 5000);
        } catch (err) {
            toast(`${err}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            console.log(err.message);
        }
    }

    async function onCheck(event) {
        event.preventDefault();
        try {
            const data = await checkForAppointment(profile._id);
            const currentAppointment = data[0].patient.myAppointments[0];
            try {
                const appointmentDetails = await getMyAppointment(currentAppointment);
                setMyAppointments(appointmentDetails);
                getMyExaminationsId();
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

    async function getMyExaminationsId() {
        try {
            const examinationId = await getMyExaminations(userId);
            setExaminationId(examinationId);
            checkMyExaminationStatus(examinationId);
            return examinationId;
        } catch (err) {
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

    async function checkMyExaminationStatus(examinationId) {
        try {
            const myExaminationStatus = await getMyExaminationStatus(examinationId);
            if (myExaminationStatus.isCompleted === 'true') {
                setCompleted(true);
            }
            return myExaminationStatus;
        } catch (err) {
            console.log(err.message);
        }
    }

    console.log('isCompleted', isCompleted);
    return (
        <div>
            <Grid id="profile-container" container spacing={2}>
                <Grid id="patient-info-container" item xs={6}>
                    <div className="patient-info">
                        <div>
                            <Avatar className="avatar" alt="Doctor" src={profile?.imageUrl} sx={{ width: 150, height: 150 }} />
                        </div>
                        <div>
                            <p>
                                <span>Medical Professional ID: {profile._id}</span><br />
                                <span id="full-name">{profile.name}</span><br />
                                <span id="username">Username: {profile.username}</span><br />
                                <span>{profile?.gender} | {profile?.age}</span><br />
                            </p>
                            {checkMedical
                                ? null
                                : <><Link to={`/chat/${userId || user.medical[0]}`} className="profile-buttons" onClick={setChatName}>Send Message</Link><br />
                                    <Link className="profile-buttons" to={`/medicals/request-appointment/${userId || user.medical[0]}`}>Request an appointment</Link></>
                            }
                        </div>
                    </div>

                    <div className="personal-details">
                        <h6>Personal information:</h6>
                        <table className="responsive-table">
                            <tbody>
                                <tr>
                                    <td>Department</td><td>{profile?.department}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td><td>{profile?.phone}</td>
                                </tr>
                                <tr>
                                    <td>Email</td><td>{profile?.email}</td>
                                </tr>
                                <tr>
                                    <td>Areas of Focus</td><td>{profile?.areas}</td>
                                </tr>
                                <tr>
                                    <td>Practice location:</td><td>{profile?.practiceLocation}</td>
                                </tr>
                            </tbody>
                        </table>
                        {checkMedical
                            ? <div><button onClick={onDeleteMedical} id="deleteUserBtn" type="submit">Delete</button>
                                <Link to={`/medicals/edit/${profile._id}`} id="editUserBtn">Edit</Link></div>
                            : null
                        }
                    </div>
                </Grid>
                <Grid id="patient-history-container" item xs={6}>
                    <><div className="section-title">
                        <h5>Bio</h5>
                    </div>
                        <div className="text-info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum iusto enim optio alias necessitatibus, cupiditate eligendi quae ad assumenda quasi veritatis saepe odio repellendus delectus placeat possimus qui dicta itaque.</div>
                        {!checkMedical
                            ? ""
                            : <><div className="section-title">
                                <h5>My appointments</h5>
                            </div>
                                <ul className="appointment-block">
                                    {myAppointments.length !== 0
                                        ? <>{isCompleted
                                            ?  <div><p id="no-appointments">All Examination completed</p></div>
                                            :  <div id="appointments-list">{<AppointmentMedical appointment={myAppointments} key={myAppointments._id} />}</div>
                                        } </>
                                       
                                        : <div><p id="no-appointments">No appointments yet</p></div>
                                    }
                                </ul></>
                        }
                        {checkMedical
                            ? <button type="submit" id="checkBtn" onClick={onCheck}>Check for appointment requests</button>
                            : null
                        }
                        <div className="section-title">
                            <h5>Statistics</h5>
                        </div>

                        <table className="responsive-table">
                            <tbody>
                                <tr>
                                    <td>Current patients' count</td><td>324</td>
                                </tr>
                                <tr>
                                    <td>Ratings</td><td>100% Positive</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="section-title">
                            <i className="small material-icons">pageview</i> <Link className="results-link" to="/" alt="Patient Examination Results">Upload Results</Link>
                        </div>
                    </>
                </Grid>
            </Grid>
        </div>
    )
}

export default PublicMedicalProfile;