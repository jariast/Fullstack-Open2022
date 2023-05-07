import { Patient } from '../types';
import { api } from './api';

export const patientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<Patient[], void>({
      query: () => '/patients',
    }),
    getPatient: builder.query<Patient, string>({
      query: (patientId) => `/patients/${patientId}`,
    }),
  }),
});

export const { useGetPatientsQuery, useGetPatientQuery } = patientApi;
