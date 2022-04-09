import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function IconSection() {
    const user = sessionStorage.getItem('username');
    const userId = sessionStorage.getItem('userId');
    const myDoctor = sessionStorage.getItem('myDoctor');
    const role = sessionStorage.getItem('role');
    const isMedical = role === 'medical-professional';

    function notify(event) {
        const redirect = document.getElementById('redirect');

        if (event.target === redirect) {
            toast('You must be a registered patient in order to see your medical examination results!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            toast('You must be a registered patient in order to choose a medical and request an appointment!', {
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
        <div className="container">
            <div className="section">
                <div className="row">
                    <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center green-icons"><i className="material-icons">healing</i></h2>
                            <Link className="icons-link" to="/staff" alt="Find the best specialist for you">Find a Doctor <i className="material-icons arrow" >keyboard_arrow_right</i></Link>

                            <p className="light">You do not need to come to us in person to find the right specialist for you. Use our search tool. We have medical professionals with extensive experience in various fields. Trust them, they will not let you down.</p>
                        </div>
                    </div>

                    <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center green-icons"><i className="material-icons">schedule</i></h2>
                            {isMedical
                                ? <Link className="icons-link" to={`/medicals/my-patients/${userId}`} alt="Login medical professional">My patients <i className="material-icons arrow" >keyboard_arrow_right</i></Link>
                                : <>
                                    {user && myDoctor !== undefined
                                        ? <Link className="icons-link" to={`/medicals/request-appointment/${myDoctor}`} alt="Find the best specialist for you">Appointments <i className="material-icons arrow" >keyboard_arrow_right</i></Link>
                                        : <Link className="icons-link" to="/users/patient/login" alt="Find the best specialist for you" onClick={notify}>Appointments <i className="material-icons arrow" >keyboard_arrow_right</i></Link>
                                    }
                                </>
                            }


                            <p className="light">Worried about a physical examination during the Covid-19 pandemic? Stop it! We have taken huge measures to protect you from infection - constant disinfection, wearing protective masks, keeping a physical distance, and limiting patients meeting each other.</p>
                        </div>
                    </div>

                    <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center green-icons"><i className="material-icons">assignment</i></h2>
                            {isMedical
                                ? <Link className="icons-link" to={`/users/medical/${userId}`} alt="Medical account">My Account <i className="material-icons arrow" >keyboard_arrow_right</i></Link>
                                : <>
                                    {user && myDoctor !== undefined
                                        ? <Link className="icons-link" to={`/examination-results/${userId}`} alt="Find the best specialist for you">Examination Results <i className="material-icons arrow" >keyboard_arrow_right</i></Link>
                                        : <Link className="icons-link" id="redirect" to="/users/patient/login" alt="Find the best specialist for you" onClick={notify}>Examination Results <i className="material-icons arrow" >keyboard_arrow_right</i></Link>
                                    }
                                </>
                            }


                            <p className="light">You have undergone a medical examination and you need to pick up your results? You don't have to wait in line in front of the doctor's office. Your doctor will publish your results on your patient profile as soon as they are ready so you can see them online.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IconSection;