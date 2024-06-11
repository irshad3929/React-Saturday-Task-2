import React from 'react';
import { useController, Control } from 'react-hook-form';
import { TextField } from '@mui/material';

// mostly type
interface SharedFileInputProps {
  name: string;
  control: Control<any>;
  label: string;
  rules?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// why you have used to different inputs
const SharedFileInput: React.FC<SharedFileInputProps> = ({ name, control, label, rules, onChange }) => {
  const {
    field: { ref, value, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      <input
        type="file"
        {...inputProps}
        ref={ref}
        onChange={(e) => {
          inputProps.onChange(e);
          if (onChange) onChange(e);
        }}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default SharedFileInput;
