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

    const handleSubmission = async () => {
        if (isFilePicked) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            uploadExaminationResult(formData, examinationId, medicalId, userId)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('File uploaded successfully. Examination procedure completed.');
                        window.location.reload();
                    } else {
                        toast.error('Something went wrong');
                    }
                })
                .catch((error) => {
                    toast.error(`${error.message}`);
                });
        }
    };

    return (
        <div>
            <form encType="multipart/form-data" action="/upload" method="POST">
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