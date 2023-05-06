import { createSlice } from '@reduxjs/toolkit';
import { Patient } from '../types';

interface PatientsState {
  patients: Patient[];
}

const initialState: PatientsState = {
  patients: [],
};

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
});

export default patientsSlice.reducer;
