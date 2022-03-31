import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { getPatientProfile } from '../../features/auth/authAPI.js';

function PublicPatientProfile() {
    const location = useLocation();
    const patientId = location.pathname.split('/')[3];
    const [profile, setProfile] = useState([]);
    // eslint-disable-next-line no-unused-vars

    useEffect(() => {
        getMedicalName();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getMedicalName = async () => {
        try {
            const singleProfile = await getPatientProfile(patientId);
            setProfile(singleProfile);
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div>
            <Grid id="profile-container" container spacing={2}>
                <Grid id="patient-info-container" item xs={6}>
                    <div className="patient-info">
                        <div>
                            <Avatar className="avatar" alt="Doctor Smith" src={profile.imageUrl} sx={{ width: 150, height: 150 }} />
                        </div>
                        <div>
                            <p>
                                <span>Patient ID: {profile._id}</span><br />
                                <span id="full-name">{profile.name}</span><br />
                                <span>{profile.gender} | {profile.age}</span>
                            </p>
                        </div>
                    </div>
                    <div className="send-message">
                        <button className="sendMessageOption">Send Message</button>
                    </div>

                    <div className="personal-details">
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
                    </div>
                </Grid>
                <Grid id="patient-history-container" item xs={6}>
                    <h4>History</h4>
                    <div className="section-title">
                        <h5>Diagnosis</h5><i className="small material-icons">mode_edit</i>
                    </div>
                    <div className="text-info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum iusto enim optio alias necessitatibus, cupiditate eligendi quae ad assumenda quasi veritatis saepe odio repellendus delectus placeat possimus qui dicta itaque.</div>
                    <div className="section-title">
                        <h5>Diagnosis</h5><i className="small material-icons">mode_edit</i>
                    </div>
                    <div className="text-info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum iusto enim optio alias necessitatibus, cupiditate eligendi quae ad assumenda quasi veritatis saepe odio repellendus delectus placeat possimus qui dicta itaque.</div>
                    <div className="section-title">
                        <h5>Diagnosis</h5><i className="small material-icons">mode_edit</i>
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
                    <div className="section-title">
                        <i className="small material-icons">pageview</i> <Link className="results-link" to="/" alt="Patient Examination Results">View Results</Link>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default PublicPatientProfile;