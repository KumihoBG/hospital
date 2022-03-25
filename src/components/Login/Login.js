import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../../features/auth/authSlice.js';
import Spinner from '../Spinner/Spinner.js';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/home')
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

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="login-container">
                <div className="form-container">
                    <form className="register-form" onSubmit={onSubmit} method="POST">
                    <h3>Login to your account</h3>
                    <div className="form-group">
                            <label>Username</label><br></br>
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
                            <button type="submit" id="loginBtn">Login</button>
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
