import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { NewEntry } from '../../types';

interface Props {
  onFormSubmit: (newEntry: NewEntry) => void;
}

const validationSchema = yup.object({
  description: yup.string().required('Description is required'),
  date: yup.string().required('You must enter a date'),
  specialist: yup.string().required('Specialist name required'),
  // diagnosisCodes: yup.array().of(yup.string()),
  healthCheckRating: yup.number().required(),
});

const AddEntryForm = ({ onFormSubmit }: Props) => {
  const formik = useFormik({
    initialValues: {
      description: '',
      date: '2023-03-12',
      specialist: '',
      // diagnosisCodes: [],
      healthCheckRating: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newEntry: NewEntry = {
        ...values,
        type: 'HealthCheck',
      };
      onFormSubmit(newEntry);
    },
  });
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
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export { AddEntryForm };
