import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import registerBackground from '../../../images/register-bg.jpg';
import { validateInput } from '../../helpers/validator.js';

function Register() {
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // eslint-disable-next-line no-unused-vars
    const [rePass, setRePass] = useState();
    const [imageUrl, setImageUrl] = useState();

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
            switch(gender) {
                case "male": imageUrl = 'male.jpg'; break;
                case "female": imageUrl = 'female.jpg'; break;
                default: break;
            }
        }

        try {
            await validateInput(name, username, email, password, rePass, imageUrl, role);
            setUsername(username);
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
                        <label>Name</label><br></br>
                        <input name="name" type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)}></input><br></br>
                        <label>Username</label><br></br>
                        <div className="icon">
                            <i className="fas fa-user"></i>
                            <input name="username" type="text" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)}></input><br></br>
                        </div>
                        <label>Email</label><br></br>
                        <div className="icon">
                            <i className="fas fa-envelope-open-text"></i>
                            <input name="email" type="email" autoComplete="email" pattern="[^]+@[^]+[.][a-z]{2,63}$" value={email} onChange={e => setEmail(e.target.value)}></input><br></br>
                        </div>
                        <p className="register-info"><i className="fas fa-info-circle"></i> Password must be between 6 and 10 characters. Password must consist only of letters and at least 2 digits.</p>
                        <label>Password</label><br></br>
                        <div className="icon">
                            <i className="fas fa-lock"></i>
                            <input
                                className="password"
                                type={passwordShown ? "text" : "password"} autoComplete="current-password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}>
                            </input>
                            <i id="eye-one"
                                className="fas fa-eye"
                                onClick={togglePasswordVisiblity}>
                            </i>
                            <br></br>
                        </div>
                        <label>Repeat password</label><br></br>
                        <div className="icon">
                            <i className="fas fa-lock"></i>
                            <input
                                className="rePass"
                                type={passwordShown ? "text" : "password"} autoComplete="current-password"
                                name="rePass"
                                onChange={e => setRePass(e.target.value)}>
                            </input>
                            <br></br>
                            <i id="eye-two"
                                className="fas fa-eye"
                                onClick={togglePasswordVisiblity}>
                            </i>
                        </div>
                        <label>Profile image</label><br></br>
                        <div className="input-container">
                            <input
                                value={imageUrl} 
                                className="imageUrl"
                                name="imageUrl"
                                type="text" 
                                onChange={e => setImageUrl(e.target.value)}/>
                            </div>
                            <fieldset id="gender">
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
                        </fieldset>
                            <div>
                                <button type="submit" className="registerBtn">Register</button>
                            </div>
                    </form>
                    <div className="second">
                        <Link className="link" to="/login" alt="login">Already have an account?</Link><br></br>
                    </div>
                </div>
            </div>
            {/* <div className="register-image" style={{ backgroundImage: `url(${registerBackground})` }}>

            </div> */}
        </section>
    )
}

export default Register;
