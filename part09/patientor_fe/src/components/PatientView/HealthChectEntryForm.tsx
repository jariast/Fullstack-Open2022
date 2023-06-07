import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { NewEntry, EntryType } from '../../types';
import { useEffect } from 'react';
import { baseEntryValidationSchema, baseInitialValues } from './formConstants';

interface Props {
  onFormSubmit: (newEntry: NewEntry) => void;
  isSubmitSuccess: boolean;
}

const validationSchema = baseEntryValidationSchema.concat(
  yup.object({
    healthCheckRating: yup.number().required('Healh Rating is required'),
  })
);

const HealtCheckEntryForm = ({ onFormSubmit, isSubmitSuccess }: Props) => {
  const formik = useFormik({
    initialValues: {
      ...baseInitialValues,
      healthCheckRating: 0,
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