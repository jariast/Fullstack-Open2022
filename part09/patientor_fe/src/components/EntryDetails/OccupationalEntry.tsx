import { Work } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Entry } from '../../types';

type ExtractedHospitalEntry = Extract<
  Entry,
  { type: 'OccupationalHealthcare' }
>;

interface Props {
  entry: ExtractedHospitalEntry;
}

function OccupationlalEntry({ entry }: Props) {
  return (
    <Card>
      <CardHeader
        title={
          <>
            {entry.date} - {entry.specialist}
            <Work></Work>
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {entry.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Employer: {entry.employerName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sickleave:{' '}
          {`${entry.sickLeave?.startDate} - ${entry.sickLeave?.endDate}`}
        </Typography>
        <ul>
          {entry.diagnoses?.map((d) => (
            <List key={d.code}>
              <ListItem>
                <ListItemText primary={`${d.code} - ${d.name}`} />
              </ListItem>
            </List>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export { OccupationlalEntry };
