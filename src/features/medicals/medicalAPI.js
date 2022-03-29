const BASE_LOCAL_URL = 'http://localhost:5000';

// Get all medicals
export const getAllMedicals = async () => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/medicals`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Get all patients
export async function getAllPatients(userId) {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/medicals/my-patients/${userId}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}