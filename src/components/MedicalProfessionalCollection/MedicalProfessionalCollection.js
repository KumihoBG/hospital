import React, { useEffect, useState } from 'react';
import MedicalProfessional from '../MedicalProfessional/MedicalProfessional.js';
import {getAllMedicals} from '../../features/medicals/medicalService.js';

function MedicalProfessionalCollection() {
    const [medicals, setMedicals] = useState([]);

    useEffect(() => {
        getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAll = async () => {
        const allMedicals = await getAllMedicals();
        setMedicals(allMedicals);
    }

    return (
        <div className="staff-container">
            <h4 className="staff-title">Doctors & Medical Staff</h4>
            <h6>Our specialists have extensive knowledge in all areas of medicine.</h6>
            <ul className="collection">
                {medicals.map(medical => {
                    return <MedicalProfessional medical={medical} key={medical.id} />
                })}
            </ul>
        </div>
    )
}

export default MedicalProfessionalCollection;