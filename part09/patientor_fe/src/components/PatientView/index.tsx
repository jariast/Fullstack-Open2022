import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnose, Gender, NewEntry, Patient } from '../../types';
import patientService from '../../services/patients';
import axios from 'axios';
import { Female, Male, Transgender } from '@mui/icons-material';
import { EntryDetails } from '../EntryDetails';
import { Box, Typography } from '@mui/material';
import { AddEntryForm } from './AddEntryForm';

interface Props {
  diagnoses: Diagnose[];
}

const PatientView = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState('');

  const patientId = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId) {
        setError('Patiend ID is missing');
        return;
      }

      try {
        const patient = await patientService.getPatientById(patientId);
        setPatient(patient);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
          console.log('Error', error.message);
        }
      }
    };

    void fetchPatient();
  }, []);

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

  function buildDiagnosesArray(
    diagnosesCodes: Array<Diagnose['code']>
  ): Diagnose[] {
    return diagnosesCodes.map((code) => {
      const diagnosis = diagnoses.find((d) => d.code === code);
      if (!diagnosis) {
        throw new Error('Diagnosis error');
      }
      return { ...diagnosis };
    });
  }

  async function handleEntrySubmission(newEntry: NewEntry) {
    if (!patient) {
      return;
    }
    try {
      const addedEntry = await patientService.addEntry(newEntry, patient.id);
      const patientMod = { ...patient };
      patient.entries.push(addedEntry);
      setPatient(patientMod);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
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
      {patient?.entries.map((entry) => {
        entry.diagnosisCodes &&
          (entry.diagnoses = buildDiagnosesArray(entry.diagnosisCodes));
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
      {error && <h3>{error}</h3>}
      {patient && content}
    </>
  );
};

export { PatientView };