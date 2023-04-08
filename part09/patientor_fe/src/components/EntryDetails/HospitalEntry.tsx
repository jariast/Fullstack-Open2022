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

type ExtractedHospitalEntry = Extract<Entry, { type: 'Hospital' }>;

interface Props {
  entry: ExtractedHospitalEntry;
}

function HospitalEntry({ entry }: Props) {
  return (
    <Card>
      <CardHeader title={`${entry.date} - ${entry.specialist}`} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {entry.description}
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

export { HospitalEntry };
