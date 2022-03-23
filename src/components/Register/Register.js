import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import registerBackground from '../../../images/register-bg.jpg';
import { validateInput } from '../../helpers/validator.js';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        rePass: '',
        imageUrl: '',
    });

    const { name, username, email, password, rePass, imageUrl } = formData;
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    async function registerUser(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        let name = formData.get('name').toString().trim();
        let username = formData.get('username').toString().trim();
        let email = formData.get('email').toString().trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('rePass').trim();
        let imageUrl = formData.get('imageUrl').trim();
        let gender = formData.get('gender');
        let role = 'patient';

        if (imageUrl === '') {
            switch (gender) {
                case "male": imageUrl = 'male.jpg'; break;
                case "female": imageUrl = 'female.jpg'; break;
                default: break;
            }
        }

        try {
            await validateInput(name, username, email, password, rePass, imageUrl, role);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="register-section">
            <div className="register-container">
                <div className="form-container">
                    <form className="register-form" onSubmit={e => registerUser(e)}>
                        <h1>Register</h1>
                        <p>Please enter your credentials.</p>
                        <div className="form-group">
                            <label>Name</label><br></br>
                            <input className="form-control" name="name" type="text" autoComplete="name" value={name} onChange={onChange}></input><br></br>
                        </div>
                        <div className="form-group">
                            <label>Username</label><br></br>
                            <div className="icon">
                                <i className="fas fa-user"></i>
                                <input name="username" type="text" autoComplete="username" value={username} onChange={onChange}></input><br></br>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email</label><br></br>
                            <div className="icon">
                                <i className="fas fa-envelope-open-text"></i>
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
                            <p className="register-info"><i className="fas fa-info-circle"></i> Password must be between 6 and 10 characters. Password must consist only of letters and at least 2 digits.</p>
                            <label>Password</label><br></br>
                            <div className="icon">
                                <i className="fas fa-lock"></i>
                                <input
                                    className="form-control"
                                    type={passwordShown ? "text" : "password"} autoComplete="current-password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}>
                                </input>
                                <i id="eye-one"
                                    className="fas fa-eye"
                                    onClick={togglePasswordVisiblity}>
                                </i>
                                <br></br>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Repeat password</label><br></br>
                            <div className="icon">
                                <i className="fas fa-lock"></i>
                                <input
                                    className="form-control"
                                    type={passwordShown ? "text" : "password"} autoComplete="current-password"
                                    name="rePass"
                                    onChange={onChange}>
                                </input>
                                <br></br>
                                <i id="eye-two"
                                    className="fas fa-eye"
                                    onClick={togglePasswordVisiblity}>
                                </i>
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

                        <div className="form-group">
                            <fieldset id="gender">
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    className="form-control"
                                />
                                <label htmlFor="male">Male</label>

                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    className="form-control"
                                />
                                <label htmlFor="female">Female</label>
                            </fieldset>
                        </div>

                        <div>
                            <button type="submit" className="registerBtn">Register</button>
                        </div>
                    </form>
                    <div className="second">
                        <Link className="link" to="/auth/login" alt="login">Already have an account?</Link><br></br>
                    </div>
                </div>
            </div>
            {/* <div className="register-image" style={{ backgroundImage: `url(${registerBackground})` }}>

            </div> */}
        </section>
    )
}

export default Register;
