// src/pages/PersonalDetails.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import SharedInput from '../components/SharedInput';

const PersonalDetails: React.FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm({
    mode:'onTouched'
  });


  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
    <div className="step-card">
      <SharedInput 
        name="name" 
        control={control} 
        label="Name" 
        rules={{ required: 'Name is required',
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: "Please enter a valid string for Relationship",
          }
         }} />
      <SharedInput
        name="password"
        control={control}
        label="Password"
        type="password"
        rules={{ required: 'Password is required' }}
      />
      <SharedInput
        name="dob"
        control={control}
        label="Date of Birth"
        type="date"
        rules={{ required: 'Date of Birth is required' }}
      />
      <SharedInput
        name="phone"
        control={control}
        label="Phone Number"
        rules={{
          required: 'Phone Number is required',
          pattern: {
            value: /^\d{10}$/,
            message: 'Phone number is not valid',
          },
        }}
      />
      <SharedInput
        name="email"
        control={control}
        label="Email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Email is not valid',
          },
        }}
      />
      <SharedInput name="address" control={control} label="Address" rules={{ required: 'Address is required' }} />
      </div>
      <div className="button-container">
        {/* make it gemneric */}
      <Button type="submit" variant="contained" color="primary">
        Next
      </Button>
      </div>
    </form>
  );
};

export default PersonalDetails;
