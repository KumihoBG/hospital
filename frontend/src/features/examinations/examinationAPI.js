const BASE_LOCAL_URL = 'http://localhost:5000';

export async function requestExamination(examinationData) {
    try {
        const response = await fetch(`${BASE_LOCAL_URL}/examination-results/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(examinationData)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function uploadExaminationResult(selectedFile, examinationId, medicalId, userId) {
    try {
        const response = await fetch(`${BASE_LOCAL_URL}/uploads/upload/${examinationId}/${medicalId}/${userId}`, {
            method: 'POST',
            body: selectedFile
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function getMyExaminationStatus(examinationId) {
    try {
        const response = await fetch(`${BASE_LOCAL_URL}/examination-results/${examinationId}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function getMyExaminationResult(examinationId) {
    try {
        const response = await fetch(`${BASE_LOCAL_URL}/examination-results/${examinationId}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function getMyExaminations(userId) {
    try {
      const response = await fetch(`${BASE_LOCAL_URL}/medicals/${userId}/my-examinations`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
}

export async function downloadResult(filename) {
    try {
        const image = await fetch(`${BASE_LOCAL_URL}/uploads/download/${filename}`);
        console.log('image', image);
        const result = await image.json();
        console.log('image2', result);
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function getImage(filename) {
    try {
        const image = await fetch(`${BASE_LOCAL_URL}/uploads/image/${filename}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': 'inline'
            }
        });
        const result = await image.json();
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function getImageFileName(imageId) {
    try {
        const image = await fetch(`${BASE_LOCAL_URL}/uploads/images/${imageId}`);
        const result = await image.json();
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}