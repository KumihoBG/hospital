import React from 'react';
import Contact from '../Contact/Contact.js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { searchMedicals } from '../../features/medicals/medicalAPI';
import MedicalProfessional from '../MedicalProfessional/MedicalProfessional.js';


function FindDoctor() {
    const [medicals, setMedicals] = useState([]);

    async function onSearch(event) {
        event.preventDefault();
        try {
            const searchInput = encodeURIComponent(document.getElementById('search-input').value).toLowerCase();
            let result = await searchMedicals(searchInput);
            if (result.length === 0) {
                toast('No results found. Try again!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                setMedicals(result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log('medicals', medicals);
    return (
        <>
            {medicals.length <= 0
                ? <section id="find-doctor-container">
                    <div className="find-doctor-div">
                        <h2 id="find-doctor-h2">Find a Doctor</h2>
                        <div className="search-field">
                            <form id="search-form" onSubmit={onSearch}>
                                <div className="search-doctor">
                                    <label className="search-label" htmlFor="search-input">Find your specialist:</label>
                                    <input id="search-input" type="search" name="search-input" placeholder="Use our search tool and enter the name of a medical person or location..." required />
                                </div>
                                <button id="searchBtn" type="submit">Submit</button>
                            </form>
                        </div>
                        <Contact />
                    </div>
                </section>
                : <div className="staff-container">
                    <h4 className="staff-title">Doctors & Medical Staff</h4>
                    <h6>Search Results</h6>
                    <ul className="collection">
                        {medicals.map(medical => {
                            return <MedicalProfessional medical={medical} key={medical._id} />
                        })}
                    </ul>
                </div>
            }
        </>

    )
}

export default FindDoctor;