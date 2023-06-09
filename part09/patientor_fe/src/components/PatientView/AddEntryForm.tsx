import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { EntryType, NewEntry } from '../../types';
import { assertNever, splitStringByUpperCase } from '../../utils';
import { useState } from 'react';
import { HealtCheckEntryForm } from './HealthCheckEntryForm';
import OccupationalEntryForm from './OccupationalEntryForm';
import HospitalEntryForm from './HospitalEntry';

interface Props {
  onFormSubmit: (newEntry: NewEntry) => void;
  isSubmitSuccess: boolean;
}

interface EntryTypeOption {
  value: EntryType;
  label: string;
}

const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(
  (value) => ({ value: value, label: splitStringByUpperCase(value) })
);

const AddEntryForm = ({ onFormSubmit, isSubmitSuccess }: Props) => {
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);

  function onEntryTypeChange(event: SelectChangeEvent<string>) {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const entryType = Object.values(EntryType).find(
        (g) => g.toString() === value
      );
      if (entryType) {
        setEntryType(entryType);
        // setGender(gender);
      }
    }
  }

  let form;
  switch (entryType) {
    case EntryType.HealthCheck:
      form = (
        <HealtCheckEntryForm
          onFormSubmit={onFormSubmit}
          isSubmitSuccess={isSubmitSuccess}
        />
      );
      break;

    case EntryType.OccupationalHealthcare:
      form = (
        <OccupationalEntryForm
          onFormSubmit={onFormSubmit}
          isSubmitSuccess={isSubmitSuccess}
        />
      );
      break;

    case EntryType.Hospital:
      form = (
        <HospitalEntryForm
          onFormSubmit={onFormSubmit}
          isSubmitSuccess={isSubmitSuccess}
        />
      );
      break;

    default:
      return assertNever(entryType);
  }

  return (
    <div>
      <Select label="Entry Type" value={entryType} onChange={onEntryTypeChange}>
        {entryTypeOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {form}
    </div>
  );
};

export { AddEntryForm };
