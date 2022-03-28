import React, { useEffect, useState } from 'react';
import MedicalProfessional from '../MedicalProfessional/MedicalProfessional.js';
import {getAllMedicals} from '../../features/medicals/medicalAPI.js';

function MedicalProfessionalCollection() {
    const [medicals, setMedicals] = useState([]);

    useEffect(() => {
        getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAll = async () => {
        const myPatients = await getAllMedicals();
        setMedicals(myPatients);
    }

    return (
        <div className="staff-container">
            <h4 className="staff-title">My Patients List</h4>
            <h6>Browse information about your patients.</h6>
            <ul className="collection">
                {medicals.map(medical => {
                    return <MedicalProfessional medical={medical} key={medical._id} />
                })}
            </ul>
        </div>
    )
}

export default MedicalProfessionalCollection;