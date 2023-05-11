import { LocalHospital } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Entry, EntryType } from '../../types';

type ExtractedHospitalEntry = Extract<Entry, { type: EntryType.Hospital }>;

interface Props {
  entry: ExtractedHospitalEntry;
}

function HospitalEntry({ entry }: Props) {
  return (
    <Card>
      <CardHeader
        title={
          <>
            {entry.date} - {entry.specialist}
            <LocalHospital></LocalHospital>
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {entry.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Discharge: {`${entry.discharge.date} - ${entry.discharge.criteria}`}
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
