// src/components/SharedInput.tsx
import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface SharedInputProps {
  name: string;
  control: any;
  label: string;
  type?: string;
  rules?: any;
  defaultValue?: string;
}

const SharedInput: React.FC<SharedInputProps> = ({ name, control, label, type = 'text', rules, defaultValue = '' }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : null}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      )}
    />
  );
};

export default SharedInput;
