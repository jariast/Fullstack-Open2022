import { Entry, NewEntry, Patient, PatientFormValues } from '../types';
import { api } from './api';

export const patientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<Patient[], void>({
      query: () => '/patients',
      providesTags: [{ type: 'Patients', id: 'LIST' }],
    }),
    getPatient: builder.query<Patient, string>({
      query: (patientId) => `/patients/${patientId}`,
      providesTags: (_result, _error, patientId) => [
        { type: 'Patients', id: patientId },
      ],
    }),
    createPatient: builder.mutation<Patient, PatientFormValues>({
      query: (newPatientObj) => ({
        url: '/patients',
        method: 'POST',
        body: newPatientObj,
      }),
      invalidatesTags: [{ type: 'Patients', id: 'LIST' }],
    }),
    addEntry: builder.mutation<
      Entry,
      { newEntryObj: NewEntry; patientId: Entry['id'] }
    >({
      query: ({ newEntryObj, patientId }) => ({
        url: `/patients/${patientId}/entries`,
        method: 'POST',
        body: newEntryObj,
      }),
      invalidatesTags: (_result, _error, { patientId }) => [
        { type: 'Patients', id: patientId },
      ],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientQuery,
  useCreatePatientMutation,
  useAddEntryMutation,
} = patientApi;
