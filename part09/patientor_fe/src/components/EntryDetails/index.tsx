import { useGetDiagnosesQuery } from '../../services/diagnoses_rtk';
import { Entry, EntryType } from '../../types';
import { assertNever } from '../../utils';
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
    case EntryType.Hospital:
      return <HospitalEntry entry={entryCopy} />;

    case EntryType.OccupationalHealthcare:
      return <OccupationlalEntry entry={entryCopy} />;

    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entryCopy} />;

    default:
      return assertNever(entryCopy);
  }
}

export { EntryDetails };
