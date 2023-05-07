import { configureStore } from '@reduxjs/toolkit';
// import { diagnoseApi } from '../services/diagnoses_rtk';
import { patientApi } from '../services/patients_rtk';

export default configureStore({
  reducer: {
    [patientApi.reducerPath]: patientApi.reducer,
    // [diagnoseApi.reducerPath]: diagnoseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(patientApi.middleware),
});
