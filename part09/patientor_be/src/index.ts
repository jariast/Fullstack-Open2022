import express from 'express';
import diagnoseRouter from './routes/diagnoses';

const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('Someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
