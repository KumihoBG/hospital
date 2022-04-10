import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { getPatientProfile, getMedicalProfile, deleteSingleUser, getMyExamination } from '../../features/auth/authAPI.js';
import { getMyAppointment } from '../../features/appointments/appointmentsAPI.js';
import { toast } from 'react-toastify';
import Appointment from '../Appointment/Appointment.js';
let appId = '';


function PublicPatientProfile() {
    const location = useLocation();
    let myDoctor = sessionStorage.getItem('myDoctor');
    const patientId = location.pathname.split('/')[3];
    const [profile, setProfile] = useState([]);
    const [myAppointments, setMyAppointments] = useState([]);
    const [examinationId, setExaminationId] = useState('');
    const isMedical = sessionStorage.getItem('role') === 'medical-professional';
    const checkMedical = isMedical === true;
    const [medicalName, setMedicalName] = useState([]);
    const { user } = useSelector(
        (state) => state.auth
    )
    // eslint-disable-next-line no-unused-vars

    useEffect(() => {
        getCurrentPatient();
        getMedicalProfileInfo();
        getCurrentPatientAppointments();
        getMyExaminationsId();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCurrentPatient = async () => {
        try {
            const singleProfile = await getPatientProfile(patientId);
            setProfile(singleProfile);
        } catch (err) {
            console.log(err.message);
        }
    }

    const getCurrentPatientAppointments = async () => {
        try {
            const singleProfile = await getPatientProfile(patientId);
            appId = singleProfile.myAppointments[0];
            if (appId !== undefined) {
                const currentAppointment = await getMyAppointment(appId);
                setMyAppointments(currentAppointment);
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

    const getMedicalProfileInfo = async () => {
        try {
            const data = await getMedicalProfile(myDoctor || user._id);
            setMedicalName(data?.name);
        } catch (err) {
            console.log(err.message);
            setMedicalName('Not chosen yet');
        }
    }

    function setChatName() {
        if (profile.name) {
            sessionStorage.setItem('chatName', profile.name);
        }
    }

    async function onDeleteUser() {
        try {
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('hasDoctor');
            sessionStorage.removeItem('myDoctor');
            sessionStorage.removeItem('chatName');
            await deleteSingleUser(profile._id);

            toast('User deleted successfully! Redirecting to home page', {
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

    async function getMyExaminationsId() {
        try {
            const examinationId = await getMyExamination(profile._id);
            setExaminationId(examinationId);
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
    console.log('examinationId', examinationId);
    return (
        <div>
            <Grid id="profile-container" container spacing={2}>
                <Grid id="patient-info-container" item xs={6}>
                    <div className="patient-info">
                        <div>
                            <Avatar className="avatar" alt="Doctor Smith" src={profile?.imageUrl} sx={{ width: 150, height: 150 }} />
                        </div>
                        <div>
                            <p>
                                <span>Patient ID: {profile._id}</span><br />
                                <span id="full-name">{profile.name}</span><br />
                                <span id="username">Username: {profile.username}</span><br />
                                <span>{profile.gender} | {profile.age}</span>
                            </p>
                            {!checkMedical
                                ? null
                                : <Link to={`/chat/${patientId}`} id="sendMessage" onClick={setChatName}>Send Message</Link>
                            }
                        </div>
                    </div>

                    <div className="personal-details">
                        <div className="section-title">
                            <h5>Personal information:</h5>
                        </div>
                        <table className="responsive-table">
                            <tbody>
                                <tr>
                                    <td>Phone Number</td><td>{profile.phone}</td>
                                </tr>
                                <tr>
                                    <td>Email</td><td>{profile.email}</td>
                                </tr>
                                <tr>
                                    <td>Address</td><td>{profile.address}</td>
                                </tr>
                            </tbody>
                        </table>
                        {!checkMedical
                            ? <div><button onClick={onDeleteUser} id="deleteUserBtn" type="submit">Delete</button>
                                <Link to={`/users/patient/${profile._id}/edit`} id="editUserBtn">Edit</Link></div>
                            : null
                        }
                    </div>
                    {!checkMedical
                        ? <div className="medication-details">
                            <div className="section-title">
                                <h5>Treated by:</h5>
                            </div>
                            <p>Patient of Medical Professional:<br />
                                <span className='bolder-names'>
                                    <Link to={`/my-medical-professional/${myDoctor}`}>
                                        {medicalName || 'Not chosen yet'}
                                    </Link>
                                </span>
                            </p>
                        </div>
                        : null
                    }
                </Grid>

                <Grid id="patient-history-container" item xs={6}>
                    <h4>History</h4>
                    <div className="section-title">
                        <h5>Diagnosis</h5>
                    </div>
                    <div className="text-info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum iusto enim optio alias necessitatibus, cupiditate eligendi quae ad assumenda quasi veritatis saepe odio repellendus delectus placeat possimus qui dicta itaque.</div>
                    <div className="section-title">
                        <h5>Medical History</h5>
                    </div>
                    <div className="text-info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum iusto enim optio alias necessitatibus, cupiditate eligendi quae ad assumenda quasi veritatis saepe odio repellendus delectus placeat possimus qui dicta itaque.</div>
                    {appId !== undefined
                    ? <>{checkMedical
                        ? ""
                        : <><div className="section-title">
                            <h5>My appointments</h5>
                        </div>
                            <ul className="appointment-block">
                                {myAppointments || myAppointments.length > 0
                                    ? <div id="appointments-list">{<Appointment appointment={myAppointments} key={myAppointments._id} />}</div>
                                    : <div><p id="no-appointments">No appointments yet</p></div>
                                }
                            </ul></>
                    }</>
                    : <><h5>My appointments</h5><br />
                    <div className="appointment-block">
                        <div className="section-title">
                            <p id="no-patient-appointments">No appointments yet</p>
                        </div></div></>
                    }
                    <div className="section-title">
                        <h5>Medical examinations and results</h5>
                    </div>
                    <table className="responsive-table">
                        <tbody>
                            <tr>
                                <td>Date</td><td>12/03/2022</td>
                            </tr>
                            <tr>
                                <td>All BP Averages</td><td>112/67.2 mm/Hg</td>
                            </tr>
                            <tr>
                                <td>Day BP Averages</td><td>116/67.4 mm/Hg</td>
                            </tr>
                            <tr>
                                <td>Night BP Averages</td><td>104/61.3 mm/Hg</td>
                            </tr>
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        </div>
    )
}

export default PublicPatientProfile;