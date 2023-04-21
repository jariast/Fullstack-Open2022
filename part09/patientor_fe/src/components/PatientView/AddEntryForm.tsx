import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({
  description: yup.string().required('Description is required'),
});

const AddEntryForm = () => {
  const formik = useFormik({
    initialValues: { description: '' },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Values: ', values);
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="description"
          name="description"
          label="Email"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export { AddEntryForm };
