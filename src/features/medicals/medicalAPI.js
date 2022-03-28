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
