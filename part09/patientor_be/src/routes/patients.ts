/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { toNewPatient } from '../../utils';
import { patientService } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatienData());
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
