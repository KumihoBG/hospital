import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { getMedicalProfile } from '../../features/auth/authAPI';

function PublicMedicalProfile() {
    const { userId } = useParams();
    const { medicalId } = useParams();
    const [profile, setProfile] = useState([]);
    const isMedical = sessionStorage.getItem('role') === 'medical-professional';
    const checkMedical = isMedical === true;

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
                                <span>Medical Professional ID: {profile._id}</span><br />
                                <span id="full-name">{profile.name}</span><br />
                                <span>{profile.gender} | {profile.age}</span><br />
                            </p>
                            {checkMedical
                                ? null
                                : <Link to={`/chat/${medicalId}`} id="sendMessage" onClick={setChatName}>Send Message</Link>
                            }
                        </div>
                    </div>

                    <div className="personal-details">
                        <h6>Personal information:</h6>
                        {checkMedical
                            ? <i className="small material-icons">mode_edit</i>
                            : null
                        }
                        <table className="responsive-table">
                            <tbody>
                                <tr>
                                    <td>Department</td><td>{profile.department}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td><td>{profile.phone}</td>
                                </tr>
                                <tr>
                                    <td>Email</td><td>{profile.email}</td>
                                </tr>
                                <tr>
                                    <td>Areas of Focus</td><td>{profile.areas}</td>
                                </tr>
                                <tr>
                                    <td>Practice location:</td><td>{profile.practiceLocation}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Grid>
                <Grid id="patient-history-container" item xs={6}>
                    <><div className="section-title">
                        <h5>Bio</h5>
                        {checkMedical
                            ? <i className="small material-icons">mode_edit</i>
                            : null
                        }
                    </div>
                        <div className="text-info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum iusto enim optio alias necessitatibus, cupiditate eligendi quae ad assumenda quasi veritatis saepe odio repellendus delectus placeat possimus qui dicta itaque.</div>
                        <div className="section-title">
                            <h5>Statistics</h5>
                            {checkMedical
                                ? <i className="small material-icons">mode_edit</i>
                                : null
                            }
                        </div>

                        <table className="responsive-table">
                            <tbody>
                                <tr>
                                    <td>Current patients' count</td><td>324</td>
                                </tr>
                                <tr>
                                    <td>Accept patient</td><td>Yes | No</td>
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