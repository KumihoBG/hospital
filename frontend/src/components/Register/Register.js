import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../../features/auth/authSlice.js';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        rePass: '',
        gender: '',
        role: 'patient',
        imageUrl: '',
        address: '',
        phone: '',
        age: ''
    })

    let { name, username, email, password, rePass, gender, role, imageUrl, address, phone, age } = formData

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

        if (password !== rePass) {
            toast("Two passwords don't match!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            if (imageUrl === '') {
                switch(gender) {
                    case "male": imageUrl = '/male.jpg'; break;
                    case "female": imageUrl = '/female.jpg'; break;
                    default: break;
                }
            }
            const userData = {
                name,
                username,
                email,
                password,
                gender,
                role,
                imageUrl,
                address,
                phone,
                age
            }
            try {
                dispatch(register(userData))
            } catch(err) {
                console.log(err.message)
                dispatch(reset())
                dispatch(isError(err.message))
            }   
        }
    }

    return (
        <>
            <div className="register-container">
                <div className="form-container">
                    <form className="register-form" onSubmit={onSubmit} method="POST">
                        <h3>Register new Patient account</h3>
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
                                    <label>Address</label><br></br>
                                    <div className="input-container">
                                        <input
                                            value={address}
                                            className="form-control"
                                            name="address"
                                            type="text"
                                            onChange={onChange} />
                                    </div>
                                </div>
                            
                           
                        <div className="form-group">
                            <label>Phone number</label><br></br>
                            <div className="input-container">
                                <input
                                    value={phone}
                                    className="form-control"
                                    name="phone"
                                    type="text"
                                    onChange={onChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Age</label><br></br>
                            <div className="input-container">
                                <input
                                    value={age}
                                    className="form-control"
                                    name="age"
                                    type="number"
                                    min={1}
                                    max={100}
                                    onChange={onChange} />
                            </div>
                        </div>

                        <div className="form-group" id="gender">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                required
                                onChange={onChange} 
                            />
                            <label htmlFor="male">Male</label>

                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                onChange={onChange} 
                            />
                            <label htmlFor="female">Female</label>
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

export default Register
