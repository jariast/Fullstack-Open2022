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

//TODO Add Date validations.
const validationSchema = baseEntryValidationSchema.concat(
  yup.object({
    discharge: yup
      .object({
        date: yup.string().required('Discharge Date is required'),
        criteria: yup.string().required('Discharge Criteria Required'),
      })
      .required(),
  })
);

const HospitalEntryForm = ({ onFormSubmit, isSubmitSuccess }: Props) => {
  const formik = useFormik({
    initialValues: {
      ...baseInitialValues,
      discharge: { date: '', criteria: '' },
    },
    validationSchema,
    onSubmit: (values) => {
      const newEntry: NewEntry = {
        ...values,
        type: EntryType.Hospital,
      };
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
          id="discharge.date"
          name="discharge.date"
          label="Discharge Date"
          type="date"
          value={formik.values.discharge.date}
          onChange={formik.handleChange}
          //Why could the discharge property be undefined?
          error={
            formik.touched.discharge?.date &&
            Boolean(formik.errors.discharge?.date)
          }
          helperText={
            formik.touched.discharge?.date && formik.errors.discharge?.date
          }
        />
        <TextField
          id="discharge.criteria"
          name="discharge.criteria"
          label="Discharge Criteria"
          value={formik.values.discharge.criteria}
          onChange={formik.handleChange}
          error={
            formik.touched.discharge?.criteria &&
            Boolean(formik.errors.discharge?.criteria)
          }
          helperText={
            formik.touched.discharge?.criteria &&
            formik.errors.discharge?.criteria
          }
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default HospitalEntryForm;
