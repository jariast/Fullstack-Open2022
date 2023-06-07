import { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { EntryType, NewEntry } from '../../types';
import { baseEntryValidationSchema, baseInitialValues } from './formConstants';
import * as yup from 'yup';
import { useFormik } from 'formik';

interface Props {
  onFormSubmit: (newEntry: NewEntry) => void;
  isSubmitSuccess: boolean;
}

const validationSchema = baseEntryValidationSchema.concat(
  yup.object({
    employerName: yup.string().required('Employer name is required'),
    sickLeave: yup.object({ startDate: yup.string(), endDate: yup.string() }),
  })
);

const OccupationalEntryForm = ({ onFormSubmit, isSubmitSuccess }: Props) => {
  const formik = useFormik({
    initialValues: {
      ...baseInitialValues,
      employerName: '',
      sickLeave: { startDate: '', endDate: '' },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newEntry: NewEntry = {
        ...values,
        type: EntryType.OccupationalHealthcare,
      };
      if (!values.sickLeave.endDate && !values.sickLeave.startDate) {
        delete newEntry.sickLeave;
      }
      onFormSubmit(newEntry);
    },
  });

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
          id="employerName"
          name="employerName"
          label="Employer Name"
          value={formik.values.employerName}
          onChange={formik.handleChange}
          error={
            formik.touched.employerName && Boolean(formik.errors.employerName)
          }
          helperText={formik.touched.employerName && formik.errors.employerName}
        />
        <TextField
          id="sickLeave.startDate"
          name="sickLeave.startDate"
          label="Start Date"
          type="date"
          value={formik.values.sickLeave.startDate}
          onChange={formik.handleChange}
        />
        <TextField
          id="sickLeave.endDate"
          name="sickLeave.endDate"
          label="End Date"
          type="date"
          value={formik.values.sickLeave.endDate}
          onChange={formik.handleChange}
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default OccupationalEntryForm;
