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