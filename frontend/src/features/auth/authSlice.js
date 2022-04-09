import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authAPI.js';

// Get user from localStorage
const user = JSON.parse(sessionStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'register-patient',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Register medical professional
export const registerMedical = createAsyncThunk(
  'register-medical',
  async (user, thunkAPI) => {
    try {
      return await authService.registerMedical(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Register admin
export const registerAdmin = createAsyncThunk(
  'register-admin',
  async (user, thunkAPI) => {
    try {
      return await authService.registerAdmin(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('patient/login', async (user, thunkAPI) => {
  try {
    const newUser = await authService.login(user);
    if (newUser) {
      return newUser;
    } else {
      return thunkAPI.rejectWithValue('Invalid credentials');
    }
  } catch (error) {
    const message =
      (error.response 
      && error.response.data 
      && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Login medical professional
export const loginMedicalProfessional = createAsyncThunk('medical/login', async (user, thunkAPI) => {
  try {
    const newMedical = await authService.loginMedical(user);
    if (newMedical) {
      return newMedical;
    } else {
      return thunkAPI.rejectWithValue('Invalid credentials');
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Login admin
export const loginAdmin = createAsyncThunk('users/login-admin', async (user, thunkAPI) => {
  try {
    const newAdmin = await authService.loginAdmin(user);	
    if (newAdmin) {
      return newAdmin;
    } else {
      return thunkAPI.rejectWithValue('Invalid credentials');
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('logout', async () => {
   await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(registerMedical.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerMedical.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerMedical.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(registerAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(loginMedicalProfessional.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginMedicalProfessional.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginMedicalProfessional.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
  },
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;
