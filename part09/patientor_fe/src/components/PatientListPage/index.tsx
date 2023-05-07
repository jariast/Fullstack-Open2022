import { useState } from 'react';
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';

import { PatientFormValues, Patient } from '../../types';
import AddPatientModal from '../AddPatientModal';

import HealthRatingBar from '../HealthRatingBar';

import patientService from '../../services/patients';
import { Link } from 'react-router-dom';
import {
  useCreatePostMutation,
  useGetPatientsQuery,
} from '../../services/patients_rtk';
import { parseRTKQueryError } from '../../utils';

const PatientListPage = () => {
  const { data: patients, isLoading, error } = useGetPatientsQuery();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [addNewPatient, { error: patientCreationError }] =
    useCreatePostMutation();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      await addNewPatient(values).unwrap();
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to save patient: ', error);
    }
  };

  let content;

  if (isLoading) {
    content = <h1>Loading Patients data</h1>;
  } else if (patients) {
    content = (
      <Table style={{ marginBottom: '1em' }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link to={`/patient/${patient.id}`}>{patient.name}</Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else if (error) {
    const errorMsg = parseRTKQueryError(error);
    content = <h1>{`Error: ${errorMsg}`}</h1>;
  }

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      {content}
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={parseRTKQueryError(patientCreationError)}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
