import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExcercises } from './exerciseCalculator';
import { isNotNumber } from './utils';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello FullStack!!');
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  if (!target || !daily_exercises) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }

  if (!Array.isArray(daily_exercises)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  if (
    isNotNumber(target) ||
    daily_exercises.some((hour) => isNotNumber(hour))
  ) {
    throw new Error('Please provide only numbers');
  }

  const exInfo = calculateExcercises(
    Number(target),
    daily_exercises.map((hourString) => Number(hourString))
  );

  res.json(exInfo);
});

app.get('/bmi', (req, res) => {
  const weightParam = req.query.weight;
  const heightParam = req.query.height;

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
