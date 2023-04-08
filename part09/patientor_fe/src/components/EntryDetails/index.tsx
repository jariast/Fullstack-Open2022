import { Entry } from '../../types';
import { HospitalEntry } from './HospitalEntry';

interface Props {
  entry: Entry;
}

function EntryDetails({ entry }: Props) {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;

    // TODO: Remember to do the exhaustive check
    default:
      return null;
  }
}

export { EntryDetails };
