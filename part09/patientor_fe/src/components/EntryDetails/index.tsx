import { Entry } from '../../types';
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
    // TODO: Remember to do the exhaustive check
    default:
      return null;
  }
}

export { EntryDetails };
