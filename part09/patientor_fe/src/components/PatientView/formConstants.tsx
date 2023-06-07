import * as yup from 'yup';

const baseEntryValidationSchema = yup.object({
  description: yup.string().required('Description is required'),
  date: yup.string().required('You must enter a date'),
  specialist: yup.string().required('Specialist name required'),
});

const baseInitialValues = {
  description: '',
  date: '2023-03-12',
  specialist: '',
};

export { baseEntryValidationSchema, baseInitialValues };
