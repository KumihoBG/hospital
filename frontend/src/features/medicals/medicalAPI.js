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
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Request an appointment
export async function requestAppointment(userId, newAppointment) {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/medicals/request-appointment/${userId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newAppointment)
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Search for medicals
export async function searchMedicals(searchText) {
  let words = searchText.split(' ');
  let medicalsList = [];
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/medicals`);
    const data = await response.json();

    for (let medical of data) {
      for (let word of words) {
        let checkOne = medical.name?.toLowerCase().includes(word?.toLowerCase());
        let checkTwo = medical.practiceLocation?.toLowerCase().includes(word?.toLowerCase());
        if (checkOne) {
          medicalsList.push(medical);
        }
        if (checkTwo) {
          medicalsList.push(medical);
        }
      }      
    }
    return medicalsList;
  } catch (error) {
    console.error(error.message);
  }
}

// Get all patients
export async function getAllAppointments() {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/medicals/appointments`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function checkForAppointment(userId) {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/medicals/appointments/check-for-approval/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function approveAppointment(appointmentId, updatedAppointment) {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/medicals/appointments/approve/${appointmentId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(updatedAppointment)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}