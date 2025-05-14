import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppUrl } from '../../lib/appData';

export interface Student {
  name: string;
  email: string;
  phone: string;
  certificates: string[];
  _id?: string;
  isVerified?: boolean;
  enrollmentDate?: string;
  department?: string;
  studentId?: string;
  address?: string;
  course?: string;
}

interface StudentState {
  currentStudent: Student | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

let currentStudent: Student | null = null;
let token: string | null = null;
try {
  const storedStudent = localStorage.getItem('currentStudent');
  const storedToken = localStorage.getItem('token');
  if (storedStudent) {
    currentStudent = JSON.parse(storedStudent);
  }
  if (storedToken) {
    token = storedToken;
  }
} catch (error) {
  console.error('Error parsing stored data:', error);
}

const initialState: StudentState = {
  currentStudent,
  token,
  loading: false,
  error: null,
};

// Modified fetchStudentProfile to handle nested student data
export const fetchStudentProfile = createAsyncThunk(
  'student/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { student: StudentState };
      const token = state.student.token;

      // console.log('Fetching profile with token:', token);

      if (!token) {
        return rejectWithValue('No token available. Please log in again.');
      }

      const response = await axios.post(
        AppUrl+'/api/student/getStudent',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log('Profile API response:', response.data);
      // Return the nested student data directly
      return response.data.student;
    } catch (err) {
      // console.error('Fetch profile error:', err);
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          `HTTP ${err.response?.status}: Failed to fetch profile`;
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  }
);

export const loginStudent = createAsyncThunk(
  '/auth/student/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(AppUrl+'/api/auth/student/login', credentials);
      const { student, token } = response.data;
      return { student, token };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue('An unknown error occurred during login');
    }
  }
);

export const registerStudent = createAsyncThunk(
  'auth/student/register',
  async (
    studentData: { name: string; email: string; phone: string; address: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(AppUrl+'/api/auth/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Failed to register student');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCertificates = createAsyncThunk(
  'student/fetchCertificates',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { student: StudentState };
      const token = state.student.token;

      if (!token) {
        throw new Error('No token available');
      }

      const response = await axios.get(AppUrl+'/api/student/certificates', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || 'Failed to fetch certificates');
      }
      return rejectWithValue('An unknown error occurred during certificate fetch');
    }
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    logoutStudent: (state) => {
      state.currentStudent = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('currentStudent');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginStudent.fulfilled, (state, action: PayloadAction<{ student: Student; token: string }>) => {
        state.loading = false;
        state.currentStudent = action.payload.student;
        state.token = action.payload.token;
        localStorage.setItem('currentStudent', JSON.stringify(action.payload.student));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action: PayloadAction<Student>) => {
        state.loading = false;
        state.currentStudent = action.payload; // Now action.payload is the student data directly
        localStorage.setItem('currentStudent', JSON.stringify(action.payload));
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCertificates.fulfilled, (state, action: PayloadAction<string[]>) => {
        if (state.currentStudent) {
          state.currentStudent.certificates = action.payload;
        }
      });
  },
});

export const { logoutStudent } = studentSlice.actions;
export default studentSlice.reducer;