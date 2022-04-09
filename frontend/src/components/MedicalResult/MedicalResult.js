import React from 'react';
import { useParams } from 'react-router-dom';

function MedicalResult() {
    const { filename } = useParams();

    return (
        <div className='medical-result'>
            <img src={`http://localhost:5000/uploads/image/${filename}`} alt="Medical result" />
        </div>
    );
}

export default MedicalResult;