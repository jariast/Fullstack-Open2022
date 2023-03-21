import { patients } from '../../data/patients';
import { NonSensitivePatientsData } from '../types';

const getNonSensitivePatienData = (): NonSensitivePatientsData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const patientService = { getNonSensitivePatienData };
