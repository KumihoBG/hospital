import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerAdmin, reset } from '../../features/auth/authSlice.js';

function RegisterAdmin() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rePass: '',
        role: '',
    })

    let { username, password, rePass } = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
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

        if (username === '' || password === '' || rePass === '') {
            toast.error('Please fill all the fields');
            return;
        }
        if (password !== rePass) {
            toast.error("Two passwords don't match!");
            return;
        }
        const userData = {
            username,
            password,
            role: 'admin',
        }
        try {
            dispatch(registerAdmin(userData))
        } catch (err) {
            console.log(err.message);
            toast.error(`${err.message}`);
            dispatch(reset())
            dispatch(isError(err.message))
        }
    }

    return (
        <>
            <div className="register-container">
                <div className="form-container">
                    <form className="register-form" onSubmit={onSubmit} method="POST">
                        <h3>Register new Patient account</h3>
                        <div className="form-group">
                            <label>Username</label><br></br>
                            <div className="icon">
                                <input
                                    className="form-control"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    value={username}
                                    onChange={onChange}></input><br></br>
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

                        <div className="form-group">
                            <label>Repeat password</label><br></br>
                            <div className="icon">
                                <input
                                    className="form-control"
                                    autoComplete="current-password"
                                    name="rePass"
                                    type="password"
                                    onChange={onChange}>
                                </input>
                                <br></br>
                            </div>
                        </div>

                        <div>
                            <button type="submit" id="registerBtn">Register</button>
                        </div>
                    </form>
                    <div className="second">
                        <Link className="link" to="/users/patient/login" alt="login">Already have an account?</Link><br></br>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterAdmin;
