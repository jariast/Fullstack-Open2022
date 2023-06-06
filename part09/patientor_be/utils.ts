import {
  Diagnose,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatient,
} from './src/types';

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
      entries: [],
    };
    return newPatient;
  }
  throw new Error('Incorrect patient data: some required fields are missing');
}

function toNewEntry(entryObj: unknown): NewEntry {
  if (!entryObj || typeof entryObj !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'type' in entryObj &&
    'description' in entryObj &&
    'date' in entryObj &&
    'specialist' in entryObj
  ) {
    switch (entryObj.type) {
      case 'HealthCheck':
        if ('healthCheckRating' in entryObj) {
          const newHealthCheckEntry: NewEntry = {
            description: parseString(entryObj.description),
            date: parseDate(entryObj.date),
            specialist: parseString(entryObj.specialist),
            diagnosisCodes: parseDiagonsisCodes(entryObj),
            type: entryObj.type,
            healthCheckRating: parseHealthRating(entryObj.healthCheckRating),
          };
          return newHealthCheckEntry;
        }
        break;

      case 'OccupationalHealthcare':
        if ('employerName' in entryObj) {
          const newOccupationalEntry: NewEntry = {
            description: parseString(entryObj.description),
            date: parseDate(entryObj.date),
            specialist: parseString(entryObj.specialist),
            diagnosisCodes: parseDiagonsisCodes(entryObj),
            type: entryObj.type,
            employerName: parseString(entryObj.employerName),
            ...('sickLeave' in entryObj && {
              sickLeave: parseSickLeave(entryObj.sickLeave),
            }), // Conditionally add sickLeave if the request has it
          };
          return newOccupationalEntry;
        }
        break;

      case 'Hospital':
        if ('discharge' in entryObj) {
          const newHospitalEntry: NewEntry = {
            description: parseString(entryObj.description),
            date: parseDate(entryObj.date),
            specialist: parseString(entryObj.specialist),
            diagnosisCodes: parseDiagonsisCodes(entryObj),
            type: entryObj.type,
            discharge: parseDischarge(entryObj.discharge),
          };
          return newHospitalEntry;
        }
        break;

      default: //TODO review this fallthrough case after submitting
        break;
    }
  }
  throw new Error('Incorrect Entry data: some required fields are missing');
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

function parseHealthRating(rating: unknown): HealthCheckRating {
  const ratingNumber = Number(rating);

  if (
    isNaN(ratingNumber) ||
    !isNumber(ratingNumber) ||
    !isHealthCheckRating(ratingNumber)
  ) {
    throw new Error(`Incorrect Health Rating: ${rating}`);
  }
  return ratingNumber;
}

function parseDiagonsisCodes(object: unknown): Array<Diagnose['code']> {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnose['code']>;
  }
  return object.diagnosisCodes as Array<Diagnose['code']>;
}

function parseSickLeave(object: unknown): {
  startDate: string;
  endDate: string;
} {
  if (
    !object ||
    typeof object !== 'object' ||
    !('startDate' in object) ||
    !('endDate' in object)
  ) {
    throw new Error(`Incorrect Sick Leave : ${object}`);
  }
  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
}

function parseDischarge(object: unknown): { date: string; criteria: string } {
  if (
    !object ||
    typeof object !== 'object' ||
    !('date' in object) ||
    !('criteria' in object)
  ) {
    throw new Error(`Incorrect Discharge: ${object}`);
  }
  return {
    date: parseDate(object.date),
    criteria: parseString(object.criteria),
  };
}

function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}

function isNumber(text: unknown): text is number {
  return typeof text === 'number';
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function isGender(param: string): param is Gender {
  return Object.values(Gender)
    .map((value) => value.toString()) // We must map here because the value is of type Gender
    .includes(param);
}

function isHealthCheckRating(param: number): param is HealthCheckRating {
  return Object.values(HealthCheckRating)
    .filter((v) => !isNaN(Number(v)))
    .includes(param);
}

function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}
export { toNewPatient, toNewEntry, assertNever };
