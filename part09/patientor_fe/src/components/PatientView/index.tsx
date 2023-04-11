import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnose, Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import axios from 'axios';
import { Female, Male, Transgender } from '@mui/icons-material';
import { EntryDetails } from '../EntryDetails';
import { Box } from '@mui/material';

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

  const content = patient ? (
    <>
      <h2>
        {patient?.name} {icon}
      </h2>
      <p>SSN: {patient?.ssn}</p>
      <p>Ocuupation: {patient?.occupation}</p>
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
