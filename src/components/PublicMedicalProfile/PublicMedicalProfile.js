import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { getMedicalProfile } from '../../features/auth/authAPI';

function PublicMedicalProfile() {
    const { medicalId } = useParams();
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        getMedicalProfileInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getMedicalProfileInfo = async () => {
        try {
            const singleProfile = await getMedicalProfile(medicalId);
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
                                <span>Medical Professional ID: {profile._id}</span><br />
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
            </Grid>
        </div>
    )
}

export default PublicMedicalProfile;