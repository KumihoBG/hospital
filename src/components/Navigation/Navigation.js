import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logoImage from '../../images/logo.png';

function Navigation() {
    const isMedical = sessionStorage.getItem('medical');
    // const userId = localStorage.getItem('userId');
    // const isLogged = userId !== null;
    const isLogged = false;
    // const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    // async function onLogout() {
    //     try {
    //         await logout();
    //         navigate('/login', { replace: true });
    //     } catch (err) {
    //         console.log(err.message)
    //     }
    // }

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
                            <li className={pathname === "/register-medical" ? "active" : ""}>
                                <NavLink to="/register-medical" alt="register">
                                    <span className="nav-icon"><ion-icon name="person-add-outline"></ion-icon></span>
                                    <span className="nav-item-title">Register Professional Account</span>
                                </NavLink>
                            </li>
                            <li className={pathname === "/login" ? "active" : ""}>
                                <NavLink to="/login" alt="login">
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