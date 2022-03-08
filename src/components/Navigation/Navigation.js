import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import '../Navigation/Navigation.css';
import logoImage from '../../images/logo.png';

function Navigation() {
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
        <nav class="white" role="navigation">
            <div class="nav-wrapper container">
                <Link id="logo-container" to="#" class="brand-logo"><img src={logoImage} id="logo-image" alt="NewLife Hospital Logo" /> NewLife Hospital</Link>

                {isLogged
                    ?
                    <div className="user">
                        <ul class="right hide-on-med-and-down">
                            <li className={pathname === "/home" ? "active" : ""}>
                                <NavLink to="/" alt="Home page: NewLife Hospital" end={true}>Home</NavLink>
                            </li>
                        </ul>
                    </div>
                    : <div className="guest">
                        <ul class="right hide-on-med-and-down">
                            <li className={pathname === "/home" ? "active" : ""}>
                                <NavLink to="/" alt="Home page: NewLife Hospital" end={true}>Home</NavLink>
                            </li>
                            <li className={splitLocation[1] === "register" ? "active" : ""}>
                                <NavLink to="/register" alt="register">
                                    <span className="nav-icon"><ion-icon name="person-add-outline"></ion-icon></span>
                                    <span className="nav-item-title">Register</span>
                                </NavLink>
                            </li>
                            <li className={splitLocation[1] === "login" ? "active" : ""}>
                                <NavLink to="/login" alt="login">
                                    <span className="nav-icon"><ion-icon name="log-in-outline"></ion-icon></span>
                                    <span className="nav-item-title">Login</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                }
                <ul id="nav-mobile" class="sidenav">
                    <li className={pathname === "/home" ? "active" : ""}>
                        <NavLink to="/" alt="Home page: NewLife Hospital" end={true}>Navbar Link</NavLink>
                    </li>
                </ul>
                <Link to="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></Link>
            </div>
        </nav>

    )
}

export default Navigation;