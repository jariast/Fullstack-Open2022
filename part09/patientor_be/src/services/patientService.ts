import { patients } from '../../data/patients';
import { NewPatient, NonSensitivePatientsData, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getNonSensitivePatienData = (): NonSensitivePatientsData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuidv4();
  const newPatient = { id, ...patient };
  patients.push(newPatient);
  return newPatient;
};

export const patientService = { getNonSensitivePatienData, addPatient };
