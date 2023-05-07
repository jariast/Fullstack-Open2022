import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { apiBaseUrl } from '../constants';
import { Diagnose, Patient } from '../types';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getPatients: builder.query<Patient[], void>({
      query: () => '/patients',
    }),
    getPatient: builder.query<Patient, string>({
      query: (patientId) => `/patients/${patientId}`,
    }),
    getDiagnoses: builder.query<Diagnose[], void>({
      query: () => 'diagnoses',
    }),
  }),
});

export const { useGetPatientsQuery, useGetPatientQuery, useGetDiagnosesQuery } =
  patientApi;
