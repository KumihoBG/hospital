import React from 'react';
import { Link } from 'react-router-dom';
import '../PatientProfile/PatientProfile.css';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

function PatientProfile() {
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
                                <span>Patient ID: 98983983</span><br />
                                <span id="full-name">Ivan Ivanov</span><br />
                                <span>M | 42</span>
                            </p>
                        </div>
                    </div>
                    <div className="send-message">
                        <button className="sendMessageBtn">Send Message</button>
                    </div>
                    <div className="personal-details">
                        <div className="section-title">
                            <h5>Personal Info</h5><i class="small material-icons">mode_edit</i>
                        </div>
                        <table className="responsive-table">
                            <tbody>
                                <tr>
                                    <td>Date of Birth</td><td>01/04/1980</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td><td>+359 888 881188</td>
                                </tr>
                                <tr>
                                    <td>Email</td> <td>ivan.ivanov@gmail.com</td>
                                </tr>
                                <tr>
                                    <td>Address</td><td>Sofia, Druzba 240, A-34</td>
                                </tr>
                                <tr>
                                    <td>Height</td><td>181 cm</td>
                                </tr>
                                <tr>
                                    <td>Weight</td><td>75 kg</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="medication-details">
                        <div className="section-title">
                            <h5>Medication Details</h5><i class="small material-icons">mode_edit</i>
                        </div>
                        <p>Patient of Medical Professional: Dr. John Smith</p>
                    </div>
                </Grid>
                <Grid id="patient-history-container" item xs={6}>
                    <h4>History</h4>
                    <div className="section-title">
                        <h5>Diagnosis</h5><i class="small material-icons">mode_edit</i>
                    </div>
                    <div className="text-info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum iusto enim optio alias necessitatibus, cupiditate eligendi quae ad assumenda quasi veritatis saepe odio repellendus delectus placeat possimus qui dicta itaque.</div>
                    <div className="section-title">
                        <h5>Notes</h5><i class="small material-icons">mode_edit</i>
                    </div>
                    <div className="text-info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum iusto enim optio alias necessitatibus, cupiditate eligendi quae ad assumenda quasi veritatis saepe odio repellendus delectus placeat possimus qui dicta itaque.</div>
                    <div className="section-title">
                        <h5>Last examination results</h5><i class="small material-icons">mode_edit</i>
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
                                <td>Night BP Averages</td> <td>104/61.3 mm/Hg</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="section-title">
                        <i class="small material-icons">pageview</i> <Link className="results-link" to="/" alt="Patient Examination Results">View Results</Link>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default PatientProfile;