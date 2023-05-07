import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import PatientListPage from './components/PatientListPage';
import { PatientView } from './components/PatientView';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patient/:id" element={<PatientView />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
