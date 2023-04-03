import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import axios from 'axios';
import { Female, Male, Transgender } from '@mui/icons-material';

const PatientView = () => {
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

  const content = (
    <>
      <h2>
        {patient?.name} {icon}
      </h2>
      <p>SSN: {patient?.ssn}</p>
      <p>Ocuupation: {patient?.occupation}</p>
      <h3>Entries</h3>
      {patient?.entries.map((entry) => (
        <>
          <p key={entry.id}>
            <span>{entry.date}</span> <span>{entry.description}</span>
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </>
      ))}
    </>
  );
  return (
    <>
      {error && <h3>{error}</h3>}
      {patient && content}
    </>
  );
};

export { PatientView };
