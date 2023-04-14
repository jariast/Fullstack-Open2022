import { Entry } from '../../types';
import { HealthCheckEntry } from './HealthCheckEntry';
import { HospitalEntry } from './HospitalEntry';
import { OccupationlalEntry } from './OccupationalEntry';

interface Props {
  entry: Entry;
}

function EntryDetails({ entry }: Props) {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;

    case 'OccupationalHealthcare':
      return <OccupationlalEntry entry={entry} />;

    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;

    default:
      return assertNever(entry);
  }
}

export { EntryDetails };

function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}
