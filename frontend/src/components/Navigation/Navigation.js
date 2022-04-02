import React from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../../images/logo.png';
import { useDispatch } from 'react-redux';
import { FaHospitalUser, FaUserInjured, FaUserGraduate, FaSignInAlt, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { logout, reset } from '../../features/auth/authSlice.js';

function Navigation() {
    const isMedical = sessionStorage.getItem('role') === 'medical-professional';
    const username = sessionStorage.getItem('username');
    const userId = sessionStorage.getItem('userId');
    const checkMedical = isMedical === true;
    const isLogged = userId !== null;
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
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
                            {checkMedical
                                ? <li className={pathname === "/users/medical/:userId" ? "active" : ""}>
                                    <NavLink to={`/users/medical/${userId}`} alt="Medical account" end={true}>My Account</NavLink>
                                </li>
                                : <li className={pathname === "/users/patient/:userId" ? "active" : ""}>
                                    <NavLink to={`/users/patient/${userId}`} alt="My Patient account" end={true}>My Account</NavLink>
                                </li>
                            }
                             {checkMedical
                                ? <li className={splitLocation[1] === "/medicals/my-patients/:userId" ? "active" : ""}>
                                    <NavLink to={`/medicals/my-patients/${userId}`} alt="My Patients">
                                        <span className="nav-item-title">My Patients</span>
                                    </NavLink>
                                </li>
                                : <li className={splitLocation[1] === "/medicals" ? "active" : ""}>
                                    <NavLink to="/medicals" alt="Our Medical Professionals">
                                        <span className="nav-item-title">Our Medical Professionals</span>
                                    </NavLink>
                                </li>
                            }
                            <li>
                                <NavLink to={`#`} alt="Logout from your account" onClick={onLogout}>
                                    <FaSignOutAlt />
                                    <span className="nav-item-title"> Logout </span>
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
                                    <FaUserInjured /><FaPlus />
                                    <span className="nav-item-title"> New Patient Account</span>
                                </NavLink>
                            </li>
                            <li className={pathname === "/users/register-medical" ? "active" : ""}>
                                <NavLink to="/users/register-medical" alt="register">
                                    <FaUserGraduate /><FaPlus />
                                    <span className="nav-item-title"> New Professional Account</span>
                                </NavLink>
                            </li>

                            <li className={pathname === "/users/patient/login" ? "active" : ""}>
                                <NavLink to="/users/patient/login" alt="login">
                                    <FaSignInAlt />
                                    <span className="nav-item-title"> Login Patients</span>
                                </NavLink>
                            </li>
                            <li className={pathname === "/users/medical/login" ? "active" : ""}>
                                <NavLink to="/users/medical/login" alt="login">
                                    <FaSignInAlt />
                                    <span className="nav-item-title"> Login Professionals</span>
                                </NavLink>
                            </li>
                            <li className={splitLocation[1] === "/medicals" ? "active" : ""}>
                                    <NavLink to="/medicals" alt="Our Medical Professionals">
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