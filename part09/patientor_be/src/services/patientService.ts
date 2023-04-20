import { patients } from '../../data/patients';
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

const getNonSensitivePatienData = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuidv4();
  const newPatient = { id, ...patient };
  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (patientId: string, entry: NewEntry): Entry => {
  const patientIdx = patients.findIndex((patient) => patient.id === patientId);
  if (patientIdx === -1) {
    throw new Error('Patient not found');
  }
  const entryId = uuidv4();
  const newEntry = { id: entryId, ...entry };
  patients[patientIdx].entries.push(newEntry);
  return newEntry;
};

export const patientService = {
  getNonSensitivePatienData,
  addPatient,
  getPatientById,
  addEntryToPatient,
};
