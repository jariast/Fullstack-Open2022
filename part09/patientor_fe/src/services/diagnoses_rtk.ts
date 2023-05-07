// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
// import { apiBaseUrl } from '../constants';
// import { Diagnose } from '../types';
//
// export const diagnoseApi = createApi({
//   reducerPath: 'diagnoseApi',
//   baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
//   endpoints: (builder) => ({
//     getDiagnoses: builder.query<Diagnose[], void>({
//       query: () => 'diagnoses',
//     }),
//   }),
// });
//
// export const { useGetDiagnosesQuery } = diagnoseApi;

import { Diagnose } from '../types';
import { api } from './api';

//
export const diagnoseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDiagnoses: builder.query<Diagnose[], void>({
      query: () => 'diagnoses',
    }),
  }),
});

export const { useGetDiagnosesQuery } = diagnoseApi;
