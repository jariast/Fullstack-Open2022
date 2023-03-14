import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello FullStack!!');
});

app.get('/bmi', (req, res) => {
  let weightParam = req.query.weight;
  let heightParam = req.query.height;

  if (isNotNumber(weightParam) || isNotNumber(heightParam)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  const weight = Number(weightParam);
  const height = Number(heightParam);
  const bmi = calculateBmi(weight, height);

  res.json({ weight, height, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`TS server is running on port ${PORT}`);
});
