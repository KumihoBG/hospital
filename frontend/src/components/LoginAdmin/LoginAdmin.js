import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginAdmin, reset } from '../../features/auth/authSlice.js';

function LoginAdmin() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const { username, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/home');
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            username,
            password,
        }
        if (username === '' || password === '') {
            toast.error('Please fill in all fields!');
            return;
        }
        try {
            dispatch(loginAdmin(userData));
        } catch (err) {
            console.log(err.message);
            toast.error(`${err.message}`);
        }
    }

    return (
        <>
            <div className="login-container">
                <div className="form-container">
                    <form className="register-form" onSubmit={onSubmit} method="POST">
                        <h3>Login to your Patient account</h3>
                        <div className="form-group">
                            <label>Username</label><br></br>
                            <div className="icon">
                                <input
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    className="form-control"
                                    default={username}
                                    onChange={onChange}>
                                </input><br></br>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label><br></br>
                            <div className="icon">
                                <input
                                    className="form-control"
                                    autoComplete="current-password"
                                    name="password"
                                    value={password}
                                    type="password"
                                    onChange={onChange}>
                                </input>
                                <br></br>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="loginBtn">Login</button>
                        </div>
                    </form>
                    <div className="second">
                        <p>Don't have an account? Create new <Link className="register-redirect" to="/register-patient" alt="register">patient</Link> or <Link className="register-redirect" to="/register-medical" alt="register">professional</Link> account</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginAdmin;
