import { configureStore } from '@reduxjs/toolkit';
import { patientApi } from '../services/patients_rtk';

export default configureStore({
  reducer: {
    [patientApi.reducerPath]: patientApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(patientApi.middleware),
});
