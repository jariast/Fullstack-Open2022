import { LocalHospital, Work } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Entry, Diagnose } from '../../types';

/*
 * This a solution to the code replication issue.
 * I'm still not sure if it's a good solution.
 * I'm sticking with the multiple components solution for the time being.
 *
 *
 * */

interface Props {
  entry: Entry;
}

function EntryCard({ entry }: Props) {
  return (
    <Card>
      <CardHeader
        title={
          <>
            {entry.date} - {entry.specialist}
            {/* Render appropriate icon based on entry type */}
            {entry.type === 'Hospital' && <LocalHospital />}
            {entry.type === 'OccupationalHealthcare' && <Work />}
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {entry.description}
        </Typography>
        {entry.type === 'Hospital' && (
          <Typography variant="body2" color="text.secondary">
            Discharge: {`${entry.discharge.date} - ${entry.discharge.criteria}`}
          </Typography>
        )}
        <ul>
          {entry.diagnoses?.map((d: Diagnose) => (
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

export default EntryCard;
