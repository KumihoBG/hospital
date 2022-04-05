import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPatientProfile, editSingleUser } from '../../features/auth/authAPI.js';

function EditUser() {
    const [user, setCurrentUser] = useState({});
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentPatient();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getCurrentPatient = async () => {
        try {
            const singleProfile = await getPatientProfile(userId);
            setCurrentUser(singleProfile);
        } catch (err) {
            console.log(err.message);
        }
    }

    async function onEditUser(event) {
        event.preventDefault();
        let formData = new FormData(document.getElementById('user-form'));
        let name = formData.get('name');
        let username = formData.get('username');
        let email = formData.get('email');
        let imageUrl = formData.get('imageUrl');
        let address = formData.get('address');
        let phone = formData.get('phone');
        let age = formData.get('age');

        const newUser = {
            name: name,
            username: username,
            email: email,
            hashedPassword: user.hashedPassword,
            role: user.role,
            gender: user.gender,
            imageUrl: imageUrl,
            address: address,
            phone: phone,
            age: age,
            myMedicalProfessional: user.myMedicalProfessional,
            myAppointments: user.myAppointments
        }

        try {
            const result = await editSingleUser(userId, newUser);
            toast('User updated successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate(`/users/patient/${userId}`, { replace: true });
            return result;
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
            });
        }
    }

    function goBack() {
        navigate(-1, { replace: true });
    }

    return (
        <section id="edit-user-details">
            <div className="loginForm-container">
                <form id="user-form" onSubmit={(e) => { onEditUser(e) }}>
                    <label htmlFor="name">Edit Full Name:</label><br />
                    <input className="edit-input" type="text" name="name" id="name" defaultValue={user.name}></input><br />
                    <label htmlFor="username">Edit Username:</label><br />
                    <input className="edit-input" type="text" name="username" id="username" defaultValue={user.username}></input><br />
                    <label htmlFor="email">Edit Email:</label><br />
                    <input className="edit-input" type="email" name="email" id="email" defaultValue={user.email}></input><br />
                    <label htmlFor="imageUrl">Edit Image:</label><br />
                    <input className="edit-input" type="text" name="imageUrl" id="imageUrl" defaultValue={user.imageUrl}></input><br />
                    <label htmlFor="address">Edit Full Name:</label><br />
                    <input className="edit-input" type="text" name="address" id="address" defaultValue={user.address}></input><br />
                    <label htmlFor="phone">Edit Phone:</label><br />
                    <input className="edit-input" type="text" name="phone" id="phone" defaultValue={user.phone}></input><br />
                    <label htmlFor="age">Edit Age:</label><br />
                    <input className="edit-input" type="text" name="age" id="age" defaultValue={user.age}></input><br />
                    <button id="submitEditUserBtn" type="submit">Edit</button>
                </form>
                <button id="cancelEditUserBtn" type="submit" onClick={goBack}>Cancel</button>
            </div>
        </section>
    )
}

export default EditUser;