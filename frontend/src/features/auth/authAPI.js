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
    return error;
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

// Register admin
const registerAdmin = async (userData) => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/users/register-admin`, {
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
    sessionStorage.setItem('role', data.role);
    return data;
  } catch (error) {
    return error.message;
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

    if (data.stack !== null) {
      if (response.status === 200) {
        sessionStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('role', data.role);
        if (data.medical.length > 0) {
          sessionStorage.setItem('hasDoctor', true);
        }
        return data;
      }
    } else {
      return data.error;
    }
  } catch (error) {
    console.error(error);
    return error;
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
    if (data.stack !== null) {
      if (response.status === 200) {
        sessionStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('role', data.role);
        return data;
      }
    } else {
      return data.error;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Login admin
const loginAdmin = async (userData) => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/users/login-admin`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (data.stack !== null) {
      if (response.status === 200) {
        sessionStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('role', data.role);
        return data;
      }
    } else {
      return data.error;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Logout user
const logout = async () => {
  window.location.replace('/home')
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('role');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('hasDoctor');
  sessionStorage.removeItem('myDoctor');
  sessionStorage.removeItem('chatName');
  sessionStorage.removeItem('isCompleted');
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

// Get my doctor
export const getMyDoctor = async (userId) => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/users/patient/${userId}/my-medical-professional`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Get my examination
export const getMyExamination = async (userId) => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/users/patient/${userId}/my-examinations`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Choose single medical
export const chooseMyDoctor = async (medicalId, userId) => {
  try {
    const myDoctor = await getMedicalProfile(medicalId);
    const response = await fetch(`${BASE_LOCAL_URL}/users/patient/${userId}/choose-my-medical-professional`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(myDoctor)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Cancel my medical
export const cancelMedical = async (medicalId, userId) => {
  try {
    const myDoctor = await getMedicalProfile(medicalId);
    const response = await fetch(`${BASE_LOCAL_URL}/users/patient/${userId}/cancel-my-medical-professional`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(myDoctor)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getUser = () => {
  let username = sessionStorage.getItem('username');
  return username;
};

export const isAuthenticated = () => {
  return Boolean(getUser())
};

export async function deleteSingleUser(userId) {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/users/patient/${userId}/delete`, {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function editSingleUser(userId, newUser) {
  try {
    const userUpdated = await fetch(`${BASE_LOCAL_URL}/users/patient/${userId}/edit`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(newUser)
    });
    const result = await userUpdated.json();
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function deleteSingleMedical(userId) {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/medicals/delete/${userId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function editSingleMedical(userId, newUser) {
  try {
    const userUpdated = await fetch(`${BASE_LOCAL_URL}/medicals/edit/${userId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(newUser)
    });
    const result = await userUpdated.json();
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

const authService = {
  register,
  registerMedical,
  registerAdmin,
  logout,
  login,
  loginMedical,
  loginAdmin,
  chooseMyDoctor,
  cancelMedical,
  getUser,
  isAuthenticated,
  deleteSingleUser,
  editSingleUser,
  getMyExamination
}

export default authService;
