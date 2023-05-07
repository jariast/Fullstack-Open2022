import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getPatients: builder.query<Patient[], void>({
      query: () => '/patients',
    }),
  }),
});

export const { useGetPatientsQuery } = patientApi;
