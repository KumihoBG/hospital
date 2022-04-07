const BASE_LOCAL_URL = 'http://localhost:5000';

export const getMyAppointment = async (id) => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/medicals/appointments/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
