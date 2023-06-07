import { useParams } from 'react-router-dom';
import { Gender, NewEntry } from '../../types';
import { Female, Male, Transgender } from '@mui/icons-material';
import { EntryDetails } from '../EntryDetails';
import { Box, Typography } from '@mui/material';
import { AddEntryForm } from './AddEntryForm';
import {
  useAddEntryMutation,
  useGetPatientQuery,
} from '../../services/patients_rtk';
import { parseRTKQueryError } from '../../utils';

const PatientView = () => {
  const patientId = useParams().id;

  const { data: patient } = useGetPatientQuery(patientId ? patientId : '');
  const [addNewEntry, { error: entryCreationError, isSuccess }] =
    useAddEntryMutation();

  let errorMsg;
  if (entryCreationError) {
    const parsedError = parseRTKQueryError(entryCreationError);
    errorMsg = <h1>{`Error: ${parsedError}`}</h1>;
  }

  let icon;
  switch (patient?.gender) {
    case Gender.Male:
      icon = <Male></Male>;
      break;
    case Gender.Female:
      icon = <Female></Female>;
      break;
    case Gender.Other:
      icon = <Transgender></Transgender>;
      break;
    default:
      break;
  }

  function handleEntrySubmission(newEntry: NewEntry) {
    if (!patient) {
      return;
    }
    addNewEntry({
      newEntryObj: newEntry,
      patientId: patient.id,
    });
  }

  const content = patient ? (
    <>
      <h2>
        {patient?.name} {icon}
      </h2>
      <p>SSN: {patient?.ssn}</p>
      <p>Ocuupation: {patient?.occupation}</p>
      <Box>
        <Typography variant="h4">Add New Entry</Typography>
        <AddEntryForm
          onFormSubmit={handleEntrySubmission}
          isSubmitSuccess={isSuccess}
        />
      </Box>

      {patient.entries.length > 0 && <h3>Entries</h3>}
      {patient.entries.map((entry) => {
        return (
          <Box key={entry.id}>
            <EntryDetails entry={entry} />
          </Box>
        );
      })}
    </>
  ) : (
    ''
  );
  return (
    <>
      {errorMsg}
      {patient && content}
    </>
  );
};

export { PatientView };
