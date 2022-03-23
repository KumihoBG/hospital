import React, { useState, useContext } from 'react';
// import { login } from '../../api/api.js';
// import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
// import loginBackground from '../../images/login.png';
// import { AuthContext } from '../../../contexts/AuthContext.js';
// import notification from '../../../helpers/notification.js';

function Login() {
    // const { login } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    async function loginUser(e) {
        e.preventDefault();
        const { username, password } = Object.fromEntries(new FormData(e.currentTarget));

        // login(username, password);
        // if (username === '' || password === '') {
        //     // notification("Empty input", "Please, fill in all fields!");
        //     return;
        // }

        if (username !== undefined
            && password !== undefined
            && username !== null
            && password !== null) {
            try {
                // const result = await login(username, password);
                setError(false);
                // if (result === null) {
                //     // notification("Something went wrong!", "Wrong username or password");
                //     navigate('/login', { replace: true });
                //     return null;
                // }
                navigate('/home', { replace: true });
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    return (
        <section className="login-section">
            <div className="login-container">
                <div className="loginForm-container">
                    <form onSubmit={e => loginUser(e)}>
                        {error && (
                            <div>Error: Wrong email or password!</div>
                        )}
                        <h1>Login</h1>
                        <p>Please enter your credentials.</p>
                        <div className="form-group">
                            <label>Username</label><br></br>
                            <div className="icon">
                                <i className="fas fa-envelope-open-text"></i>
                                <input 
                                name="username" 
                                type="text" 
                                autoComplete="username"
                                className="form-control"
                                value={username} 
                                onChange={onChange}>
                                </input><br></br>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label><br></br>
                            <div className="icon">
                                <i className="fas fa-unlock"></i>
                                <input
                                    className="form-control" 
                                    type={passwordShown ? "text" : "password"} 
                                    autoComplete="current-password"
                                    name="password"
                                    value={password} 
                                    onChange={onChange}>
                                    </input>
                                <i id="eye-three"
                                    className="fas fa-eye"
                                    onClick={togglePasswordVisiblity}></i>
                                <br></br>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="loginBtn">Login</button>
                        </div>
                    </form>
                    <div className="second">
                        <Link className="link" to="/auth/register" alt="register">Create new account</Link>
                    </div>
                </div>
            </div>
            {/* <div className="login-image" style={{ backgroundImage: `url(${loginBackground})` }}>
            </div> */}
        </section>
    )
}

export default Login;
