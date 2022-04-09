import React, { useEffect, useState } from 'react';
import Patient from '../Patient/Patient.js';
import { getAllPatients } from '../../features/medicals/medicalAPI.js';

function MedicalProfessionalCollection() {
    const [patients, setPatients] = useState([]);
    const userId = sessionStorage.getItem('userId');
    useEffect(() => {
        getAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAll = async () => {
        try {
            const myPatients = await getAllPatients(userId);
            setPatients(myPatients);
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="staff-container">
            <h4 className="staff-title">My Patients List</h4>
            <h6>Browse information about your patients.</h6>
            <ul className="collection">
                {patients.length > 0
                    ? <>{patients.map(patient => {
                        return <Patient patient={patient} key={patient._id} />
                    })}</>
                    : <div id="no-patients"><p>No patients yet</p></div>
                }
            </ul>
        </div>
    )
}

export default MedicalProfessionalCollection;