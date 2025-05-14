import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppUrl } from '../../lib/appData'

interface AdminState {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  adminData: null | {
    email: string;
  };
}

// Load from localStorage
const token = localStorage.getItem('adminToken');
let adminData = null;
try {
  const storedAdminData = localStorage.getItem('adminData');
  if (storedAdminData) {
    adminData = JSON.parse(storedAdminData);
  }
} catch (error) {
  console.error('Error parsing stored admin data:', error);
}

const initialState: AdminState = {
  isLoggedIn: !!token,
  loading: false,
  error: null,
  adminData,
};

export const loginAdmin = createAsyncThunk(
  'auth/admin/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(AppUrl+'/api/auth/admin/login', credentials);
      return { email: credentials.email, token: response.data.token };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message || 'Login failed');
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.isLoggedIn = false;
      state.adminData = null;
      state.error = null;
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
    },
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginAdmin.fulfilled,
        (state, action: PayloadAction<{ email: string; token: string }>) => {
          state.loading = false;
          state.isLoggedIn = true;
          state.adminData = { email: action.payload.email };
          localStorage.setItem('adminToken', action.payload.token);
          localStorage.setItem('adminData', JSON.stringify(state.adminData));
        }
      )
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload as string || 'Login failed';
        state.adminData = null;
      });
  },
});

export const { logoutAdmin, clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;