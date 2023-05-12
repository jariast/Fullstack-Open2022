import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { EntryType, NewEntry } from '../../types';
import { splitStringByUpperCase } from '../../utils';
import { useState } from 'react';
import { HealtCheckEntryForm } from './HealthChectEntryForm';

interface Props {
  onFormSubmit: (newEntry: NewEntry) => void;
}

interface EntryTypeOption {
  value: EntryType;
  label: string;
}

const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(
  (value) => ({ value: value, label: splitStringByUpperCase(value) })
);

const AddEntryForm = ({ onFormSubmit }: Props) => {
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
      form = <HealtCheckEntryForm onFormSubmit={onFormSubmit} />;
      break;

    default:
      form = <span>Form goes here</span>;
      break;
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
