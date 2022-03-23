import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navigation from '../Navigation/Navigation.js';
import { login, reset } from '../../features/auth/authSlice.js';
import Spinner from '../Spinner/Spinner.js';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const { username, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    // useEffect(() => {
    //     if (isError) {
    //         toast.error(message)
    //     }

    //     if (isSuccess || user) {
    //         navigate('/')
    //     }

    //     dispatch(reset())
    // }, [user, isError, isSuccess, message, navigate, dispatch])

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

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
        <Navigation />
            <div className="login-container">
                <div className="form-container">
                    <form className="register-form" onSubmit={onSubmit}>
                    <h3>Login to your account</h3>
                    <div className="form-group">
                            <label>Username</label><br></br>
                            <div className="icon">
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
                        <Link className="link" to="/register" alt="register">Create new account</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
