import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadExaminationResult } from '../../features/examinations/examinationAPI';

function FileUploadPage({ medicalId, userId, examinationId }) {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('file', selectedFile);

        try {
            const uploadResult = uploadExaminationResult(selectedFile, examinationId, medicalId, userId);
            console.log('uploadResult', uploadResult);
            toast.success('Upload successful');
        } catch (err) {
            console.log(err.message)
        }
    };

    return (
        <div>
            <form enctype="multipart/form-data" action="" method="POST">
                <input id="file" type="file" name="file" onChange={changeHandler} />
                {isFilePicked ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p>Select a file to show details</p>
                )}
            </form>
            <div>
                <button id="fileUploadBtn" type="submit" onClick={handleSubmission}>Upload</button>
            </div>
        </div>
    )
}

export default FileUploadPage;