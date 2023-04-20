/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { toNewEntry, toNewPatient } from '../../utils';
import { patientService } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatienData());
});

router.get('/:id', (req, res) => {
  const params = req.params;
  const patient = patientService.getPatientById(params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Patient Not Found');
  }
});

router.post('/:id/entries', (req, res) => {
  const params = req.params;

  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntryToPatient(params.id, newEntry);
    res.send(addedEntry);
  } catch (error: unknown) {
    let errorMsg = 'Something went wrong during Entry creation.';
    if (error instanceof Error) {
      errorMsg += ` Error: ` + error.message;
    }
    res.status(400).send(errorMsg);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMsg = 'Something went wrong.';
    if (error instanceof Error) {
      errorMsg += `Error: ` + error.message;
    }
    res.status(400).send(errorMsg);
  }
});

export default router;
