import { Patient, PatientFormValues } from '../types';
import { api } from './api';

export const patientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<Patient[], void>({
      query: () => '/patients',
      providesTags: ['Patients'],
    }),
    getPatient: builder.query<Patient, string>({
      query: (patientId) => `/patients/${patientId}`,
    }),
    createPost: builder.mutation<Patient, PatientFormValues>({
      query: (newPatientObj) => ({
        url: '/patients',
        method: 'POST',
        body: newPatientObj,
      }),
      invalidatesTags: ['Patients'],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientQuery,
  useCreatePostMutation,
} = patientApi;
