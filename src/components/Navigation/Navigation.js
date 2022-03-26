import React from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../../images/logo.png';
import { useDispatch } from 'react-redux';
import { FaHospitalUser } from "react-icons/fa";
import { logout, reset } from '../../features/auth/authSlice.js';

function Navigation() {
    const isMedical = sessionStorage.getItem('medical-professional');
    const username = sessionStorage.getItem('username');
    const userId = sessionStorage.getItem('userId');
    const isLogged = userId !== null;
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <nav className="white" role="navigation">
            <div className="nav-wrapper container">
                <Link id="logo-container" to="/" className="brand-logo"><img src={logoImage} id="logo-image" alt="NewLife Hospital Logo" /> NewLife Hospital</Link>

                {isLogged
                    ?
                    <div className="user">
                        <ul className="right hide-on-med-and-down">
                            <li className={pathname === "/home" ? "active" : ""}>
                                <NavLink to="/" alt="Home page: NewLife Hospital" end={true}>Home</NavLink>
                            </li>
                            {isMedical
                                ? <li className={pathname === "/profile/:medicalId" ? "active" : ""}>
                                    <NavLink to="/profile/:medicalId" alt="Medical account" end={true}>My Account</NavLink>
                                </li>
                                : <li className={pathname === "/profile/:patientId" ? "active" : ""}>
                                    <NavLink to="/profile/:patientId" alt="My Patient account" end={true}>My Account</NavLink>
                                </li>
                            }

                            <li className={splitLocation[1] === "list" ? "active" : ""}>
                                <NavLink to="/medical-professionals" alt="Our Medical Professionals">
                                    <span className="nav-icon"><ion-icon name="log-in-outline"></ion-icon></span>
                                    <span className="nav-item-title">Our Medical Professionals</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`#`} alt="Logout from your account" onClick={onLogout}>
                                    <span className="nav-icon"><ion-icon name="log-in-outline"></ion-icon></span>
                                    <span className="nav-item-title">Logout</span>
                                </NavLink>
                            </li>
                            <li>
                                <span id="welcome-user"><FaHospitalUser /> {username}</span>
                            </li>
                        </ul>
                    </div>
                    : <div className="guest">
                        <ul className="right hide-on-med-and-down">
                            <li className={pathname === "/home" ? "active" : ""}>
                                <NavLink to="/" alt="Home page: NewLife Hospital" end={true}>Home</NavLink>
                            </li>
                            <li className={pathname === "/users/register-patient" ? "active" : ""}>
                                <NavLink to="/users/register-patient" alt="register">
                                    <span className="nav-icon"><ion-icon name="person-add-outline"></ion-icon></span>
                                    <span className="nav-item-title">Register Patient Account</span>
                                </NavLink>
                            </li>
                            <li className={pathname === "/users/register-medical" ? "active" : ""}>
                                <NavLink to="/users/register-medical" alt="register">
                                    <span className="nav-icon"><ion-icon name="person-add-outline"></ion-icon></span>
                                    <span className="nav-item-title">Register Professional Account</span>
                                </NavLink>
                            </li>
                            {!isMedical
                                ? <li className={pathname === "/users/patient/login" ? "active" : ""}>
                                    <NavLink to="/users/patient/login" alt="login">
                                        <span className="nav-icon"><ion-icon name="log-in-outline"></ion-icon></span>
                                        <span className="nav-item-title">Login</span>
                                    </NavLink>
                                </li>
                                : <li className={pathname === "/users/patient/login" ? "active" : ""}>
                                    <NavLink to="/users/patient/login" alt="login">
                                        <span className="nav-icon"><ion-icon name="log-in-outline"></ion-icon></span>
                                        <span className="nav-item-title">Login</span>
                                    </NavLink>
                                </li>
                            }

                            <li className={pathname === "/users/medical/login" ? "active" : ""}>
                                <NavLink to="/users/medical/login" alt="login">
                                    <span className="nav-icon"><ion-icon name="log-in-outline"></ion-icon></span>
                                    <span className="nav-item-title">Login</span>
                                </NavLink>
                            </li>
                            <li className={splitLocation[1] === "list" ? "active" : ""}>
                                <NavLink to="/medical-professionals" alt="Our Medical Professionals">
                                    <span className="nav-icon"><ion-icon name="log-in-outline"></ion-icon></span>
                                    <span className="nav-item-title">Our Medical Professionals</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                }
                <ul id="nav-mobile" className="sidenav">
                    <li className={pathname === "/home" ? "active" : ""}>
                        <NavLink to="/" alt="Home page: NewLife Hospital" end={true}>Navbar Link</NavLink>
                    </li>
                </ul>
                <Link to="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
            </div>
        </nav>

    )
}

export default Navigation;