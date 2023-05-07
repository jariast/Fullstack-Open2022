import { useGetDiagnosesQuery } from '../../services/diagnoses_rtk';
import { Entry } from '../../types';
import { HealthCheckEntry } from './HealthCheckEntry';
import { HospitalEntry } from './HospitalEntry';
import { OccupationlalEntry } from './OccupationalEntry';

interface Props {
  entry: Entry;
}

function EntryDetails({ entry }: Props) {
  const { data: diagnoses } = useGetDiagnosesQuery();

  const entryCopy = { ...entry };

  if (diagnoses && entry.diagnosisCodes && entry.diagnosisCodes.length > 0) {
    entryCopy.diagnoses = entry.diagnosisCodes.map((code) => {
      const diagnosis = diagnoses.find((d) => d.code === code);
      if (!diagnosis) {
        throw new Error('Diagnosis error');
      }
      return { ...diagnosis };
    });
  }

  switch (entryCopy.type) {
    case 'Hospital':
      return <HospitalEntry entry={entryCopy} />;

    case 'OccupationalHealthcare':
      return <OccupationlalEntry entry={entryCopy} />;

    case 'HealthCheck':
      return <HealthCheckEntry entry={entryCopy} />;

    default:
      return assertNever(entryCopy);
  }
}

export { EntryDetails };

function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}
