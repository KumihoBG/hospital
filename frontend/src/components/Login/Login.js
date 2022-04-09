import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../../features/auth/authSlice.js';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData;

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
            if (user.medical[0] !== undefined) {
                sessionStorage.setItem('myDoctor', user.medical[0]);
            }
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
            email,
            password,
        }
        if (email === '' || password === '') {
            toast('Please fill in all fields!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return;
        }
        try {
            dispatch(login(userData));
        } catch (err) {
            console.log(err.message);
            toast(`${err.message}`, {
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
    <>
        <div className="login-container">
            <div className="form-container">
                <form className="register-form" onSubmit={onSubmit} method="POST">
                    <h3>Login to your Patient account</h3>
                    <div className="form-group">
                        <label>Email</label><br></br>
                        <div className="icon">
                            <input
                                name="email"
                                type="text"
                                autoComplete="email"
                                className="form-control"
                                value={email}
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

export default Login;
