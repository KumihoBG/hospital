import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { searchMedicals } from '../../features/medicals/medicalAPI';
import MedicalProfessional from '../MedicalProfessional/MedicalProfessional.js';

function SearchResult() {
    const [medicals, setMedicals] = useState([]);

    async function filterCards() {
        try {
            const searchInput = encodeURIComponent(document.getElementById('search').value).toLowerCase();
            let result = await searchMedicals(searchInput);
            setMedicals(result);
        } catch (error) {
            console.log(error);
        }
    }

    async function onSearch(event) {
        event.preventDefault();

        await filterCards();
        localStorage.setItem('filtered', true);
    }

    return (
        <div>
            <div>
                <form id="search-form" onSubmit={onSearch}>
                    <div className="search-input-field">
                        <label htmlFor="search">Look for more recipes in our library:</label>
                        <input id="search" type="search" name="search" placeholder="Filter by tag or author" required />
                    </div>
                    <button id="searchBtn" type="submit">Search</button>
                </form>
            </div>
            <div>
                {medicals.length > 0
                    ?
                    <div>
                        <h2 className='popular'>Filter Results</h2>

                        <div className='container'>
                            {medicals.map(medical => {
                                return <MedicalProfessional medical={medical} key={medical._id} />
                            })}
                        </div>
                    </div>
                    : <div>
                        {toast('No results found. Try again!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })}
                    </div>
                }
            </div>
        </div>

    )
}

export default SearchResult;