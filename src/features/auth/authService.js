   
import axios from 'axios';

const API_URL = '/patients/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    sessionStorage.setItem('patient', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/auth/login', userData)

  if (response.data) {
    sessionStorage.setItem('patient', JSON.stringify(response.data))
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