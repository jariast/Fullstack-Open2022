import { MonitorHeart } from '@mui/icons-material';
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

type ExtractedHospitalEntry = Extract<Entry, { type: EntryType.HealthCheck }>;

interface Props {
  entry: ExtractedHospitalEntry;
}

function HealthCheckEntry({ entry }: Props) {
  return (
    <Card>
      <CardHeader
        title={
          <>
            {entry.date} - {entry.specialist}
            <MonitorHeart></MonitorHeart>
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {entry.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {entry.healthCheckRating}
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

export { HealthCheckEntry };
