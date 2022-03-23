import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../../features/auth/authSlice.js';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        rePass: '',
        role: '',
        gender: '',
        imageUrl: '',
    });

    let { name, username, email, password, rePass, role, gender, imageUrl } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // eslint-disable-next-line no-unused-vars
    const { user, isLoading, isError, isSuccess, message } = useSelector(
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
      }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    async function registerUser(e) {
        e.preventDefault();

        if (imageUrl === '') {
            switch (gender) {
                case "male": imageUrl = 'male.jpg'; break;
                case "female": imageUrl = 'female.jpg'; break;
                default: break;
            }
        }

        if (password !== rePass) {
            toast.error('Passwords do not match')
          } else {
            const userData = {
              name,
              username,
              email,
              password,
              role,
              gender,
              imageUrl
            }
      
            dispatch(register(userData))
          }
        }

    return (
            <div className="register-container">
                <div className="form-container">
                    <form className="register-form" onSubmit={e => registerUser(e)}>
                        <h3>Register new account</h3>
                        <div className="form-group">
                            <label>Name</label><br></br>
                            <input className="form-control" 
                            name="name" 
                            type="text" 
                            autoComplete="name" 
                            value={name} 
                            onChange={onChange}></input><br></br>
                        </div>
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
                            <label>Email</label><br></br>
                            <div className="icon">
                                <input
                                className="form-control" 
                                name="email" 
                                type="email" 
                                autoComplete="email" 
                                pattern="[^]+@[^]+[.][a-z]{2,63}$" 
                                value={email} 
                                onChange={onChange}></input><br></br>
                            </div>
                        </div>

                        <div className="form-group">
                            <p className="register-info">Password must be between 6 and 10 characters. Password must consist only of letters and at least 2 digits.</p>
                            <label>Password</label><br></br>
                            <div className="icon">
                                <input
                                    className="form-control"
                                    autoComplete="current-password"
                                    name="password"
                                    value={password}
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
                                    onChange={onChange}>
                                </input>
                                <br></br>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Profile image</label><br></br>
                            <div className="input-container">
                                <input
                                    value={imageUrl}
                                    className="form-control"
                                    name="imageUrl"
                                    type="text"
                                    onChange={onChange} />
                            </div>
                        </div>

                        <div className="form-group" id="gender">
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                />
                                <label htmlFor="male">Male</label>

                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                />
                                <label htmlFor="female">Female</label>
                        </div>

                        <div className="form-group" id="role">
                                <input
                                    type="radio"
                                    id="patient"
                                    name="role"
                                    value="patient"
                                    onChange={onChange}
                                />
                                <label htmlFor="patient">Patient</label>

                                <input
                                    type="radio"
                                    id="medical-professional"
                                    name="role"
                                    value="medical-professional"
                                    onChange={onChange}
                                />
                                <label htmlFor="medical-professional">Medical professional</label>
                        </div>
                        <div>
                            <button type="submit" id="registerBtn">Register</button>
                        </div>
                    </form>
                    <div className="second">
                        <Link className="link" to="/auth/login" alt="login">Already have an account?</Link><br></br>
                    </div>
                </div>
            </div>
    )
}

export default Register;
