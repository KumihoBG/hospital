const BASE_LOCAL_URL = 'http://localhost:5000';

// Register user
const register = async (userData) => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/users/register-patient`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    sessionStorage.setItem('user', JSON.stringify(data));
    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('role', data.role);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Register medical professional
const registerMedical = async (userData) => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/users/register-medical`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    sessionStorage.setItem('user', JSON.stringify(data));
    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('role', data.role);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Login user
const login = async (userData) => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/users/patient/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    sessionStorage.setItem('user', JSON.stringify(data));
    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('role', data.role);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Login medical
const loginMedical = async (userData) => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/users/medical/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    sessionStorage.setItem('user', JSON.stringify(data));
    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('role', data.role);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Logout user
const logout = async () => {
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('role');
  sessionStorage.removeItem('user');
}

// Get single medical
export const getMedicalProfile = async (userId) => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/users/medical/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Get single patient
export const getPatientProfile = async (userId) => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/users/patient/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const authService = {
  register,
  registerMedical,
  logout,
  login,
  loginMedical
}

export default authService;
