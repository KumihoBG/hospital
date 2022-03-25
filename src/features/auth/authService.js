import axios from 'axios';
const BASE_LOCAL_URL = 'http://localhost:5000';
const API_URL = '/users/register-patient';

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
    console.log(data);
    sessionStorage.setItem('userId', data.id);
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
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    sessionStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  sessionStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
