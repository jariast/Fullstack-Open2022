import { useParams } from 'react-router-dom';
import { Gender, NewEntry } from '../../types';
import { Female, Male, Transgender } from '@mui/icons-material';
import { EntryDetails } from '../EntryDetails';
import { Box, Typography } from '@mui/material';
import { AddEntryForm } from './AddEntryForm';
import { useGetPatientQuery } from '../../services/patients_rtk';

// interface Props {
//   diagnoses: Diagnose[];
// }

const PatientView = () => {
  const patientId = useParams().id;

  const { data: patient } = useGetPatientQuery(patientId ? patientId : '');

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

  async function handleEntrySubmission(newEntry: NewEntry) {
    console.log('Remember to handle new entry: ', newEntry);
    // if (!patient) {
    //   return;
    // }
    // try {
    //   const addedEntry = await patientService.addEntry(newEntry, patient.id);
    //   const patientMod = { ...patient };
    //   patient.entries.push(addedEntry);
    //   // setPatient(patientMod);
    // } catch (e: unknown) {
    //   setError(parseError(e));
    // }
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
        <AddEntryForm onFormSubmit={handleEntrySubmission} />
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
      {/* {error && <h3>{error}</h3>} */}
      {patient && content}
    </>
  );
};

export { PatientView };
