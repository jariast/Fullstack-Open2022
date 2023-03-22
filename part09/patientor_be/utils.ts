import { Gender, NewPatient } from './src/types';

function toNewPatient(patientObj: unknown): NewPatient {
  if (!patientObj || typeof patientObj !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in patientObj &&
    'dateOfBirth' in patientObj &&
    'ssn' in patientObj &&
    'occupation' in patientObj &&
    'gender' in patientObj
  ) {
    const newPatient: NewPatient = {
      name: parseString(patientObj.name),
      ssn: parseString(patientObj.ssn),
      occupation: parseString(patientObj.occupation),
      dateOfBirth: parseDate(patientObj.dateOfBirth),
      gender: parseGender(patientObj.gender),
    };
    return newPatient;
  }
  throw new Error('Incorrect patient data: some required fields are missing');
}

function parseString(name: unknown): string {
  if (!isString(name)) {
    throw new Error('Incorrect Name');
  }
  return name;
}

function parseDate(date: unknown): string {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect Date: ${date}`);
  }
  return date;
}

function parseGender(gender: unknown): Gender {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect Gender: ${gender}`);
  }
  return gender;
}

function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function isGender(param: string): param is Gender {
  return Object.values(Gender)
    .map((value) => value.toString()) // We must map here because the value is of type Gender
    .includes(param);
}

export { toNewPatient };
