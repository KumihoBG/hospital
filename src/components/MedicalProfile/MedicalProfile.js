import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

function MedicalProfile() {
    const isMedical = sessionStorage.getItem('medical');

    return (
        <div>
            <Grid id="profile-container" container spacing={2}>
                <Grid id="patient-info-container" item xs={6}>
                    <div className="patient-info">
                        <div>
                            <Avatar className="avatar" alt="Doctor Smith" src={require('../../images/doctor.jpg')} sx={{ width: 150, height: 150 }} />
                        </div>
                        <div>
                            <p>
                                <span>Medical Professional ID: 98983983</span><br />
                                <span id="full-name">Ivan Nikolov</span><br />
                                <span>M | 48</span>
                            </p>
                        </div>
                    </div>
                    {!isMedical
                        ? <div className="send-message">
                            <button className="sendMessageBtn">Send Message</button>
                        </div>
                        : ""
                    }
                    <div className="personal-details">
                        {isMedical
                            ? <div className="section-title">
                                <h5>Personal information:</h5><i className="small material-icons">mode_edit</i>
                            </div>
                            : ""
                        }
                        <table className="responsive-table">
                            <tbody>
                                <tr>
                                    <td>Department</td><td>Orthopedic Surgeon</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td><td>+359 888 881188</td>
                                </tr>
                                <tr>
                                    <td>Email</td> <td>ivan.ivanov@gmail.com</td>
                                </tr>
                                <tr>
                                    <td>Areas of Focus</td><td>Hip surgery, Hip replacement, Hip fracture surgery, Hip replacement revision, Knee replacement, Knee reconstruction</td>
                                </tr>
                                <tr>
                                    <td>Practice location:</td><td>Sofia</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Grid>
                <Grid id="patient-history-container" item xs={6}>
                    <h4>My patients list</h4>
                    {isMedical
                        ? <div className="section-title">
                            <h5>Diagnosis</h5><i className="small material-icons">mode_edit</i>
                        </div>
                        : ""
                    }
                    <div className="text-info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum iusto enim optio alias necessitatibus, cupiditate eligendi quae ad assumenda quasi veritatis saepe odio repellendus delectus placeat possimus qui dicta itaque.</div>
                    {isMedical
                        ? <div className="section-title">
                            <h5>Diagnosis</h5><i className="small material-icons">mode_edit</i>
                        </div>
                        : ""
                    }
                    <div className="text-info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum iusto enim optio alias necessitatibus, cupiditate eligendi quae ad assumenda quasi veritatis saepe odio repellendus delectus placeat possimus qui dicta itaque.</div>
                    {isMedical
                        ? <div className="section-title">
                            <h5>Diagnosis</h5><i className="small material-icons">mode_edit</i>
                        </div>
                        : ""
                    }
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
                </Grid>
            </Grid>
        </div>
    )
}

export default MedicalProfile;