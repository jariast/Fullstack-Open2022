import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from '../slices/patientsReducer';

export default configureStore({
  reducer: {
    patients: patientsReducer,
  },
});
