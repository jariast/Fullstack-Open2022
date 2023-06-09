import {
  Box,
  Button,
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { NewEntry, EntryType } from '../../types';
import { useEffect } from 'react';
import { baseEntryValidationSchema, baseInitialValues } from './formConstants';
import { useGetDiagnosesQuery } from '../../services/diagnoses_rtk';

interface Props {
  onFormSubmit: (newEntry: NewEntry) => void;
  isSubmitSuccess: boolean;
}

const HealtCheckEntryForm = ({ onFormSubmit, isSubmitSuccess }: Props) => {
  const { data: diagnoses } = useGetDiagnosesQuery();
  console.log('Diagnoses: ', diagnoses);

  const diagnosisCodes = diagnoses
    ? diagnoses.map((diagnose) => diagnose.code)
    : [];

  const validationSchema = baseEntryValidationSchema.concat(
    yup.object({
      healthCheckRating: yup.number().required('Healh Rating is required'),
      diagnosisCodes: yup.array().of(yup.string().oneOf(diagnosisCodes)),
    })
  );

  const formik = useFormik({
    initialValues: {
      ...baseInitialValues,
      healthCheckRating: 0,
      diagnosisCodes: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newEntry: NewEntry = {
        ...values,
        type: EntryType.HealthCheck,
      };
      onFormSubmit(newEntry);
    },
  });

  // I'm really not sure of this approach for resetting the form.
  useEffect(() => {
    if (isSubmitSuccess) {
      formik.resetForm();
    }
  }, [isSubmitSuccess]);

  if (!diagnoses) {
    return <div>Loading diagnoses...</div>;
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          id="date"
          name="date"
          label="Date"
          type="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
        />
        <TextField
          id="specialist"
          name="specialist"
          label="Specialist"
          value={formik.values.specialist}
          onChange={formik.handleChange}
          error={formik.touched.specialist && Boolean(formik.errors.specialist)}
          helperText={formik.touched.specialist && formik.errors.specialist}
        />
        <InputLabel id="diagnosisCodes">Diagnoses</InputLabel>
        <Select
          id="diagnosisCodes"
          multiple
          name="diagnosisCodes"
          value={formik.values.diagnosisCodes}
          onChange={formik.handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {diagnoses.map((diagnose) => (
            <MenuItem key={diagnose.code} value={diagnose.code}>
              {diagnose.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          id="healthCheckRating"
          name="healthCheckRating"
          label="Health Rating"
          value={formik.values.healthCheckRating}
          onChange={formik.handleChange}
          error={
            formik.touched.healthCheckRating &&
            Boolean(formik.errors.healthCheckRating)
          }
          helperText={
            formik.touched.healthCheckRating && formik.errors.healthCheckRating
          }
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export { HealtCheckEntryForm };
