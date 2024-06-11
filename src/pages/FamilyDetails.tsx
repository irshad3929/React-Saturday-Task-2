import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IconButton, Box, Button, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import SharedInput from "../components/SharedInput";

const FamilyDetails: React.FC<{ onSubmit: (data: any) => void }> = ({
  onSubmit,
}) => {
  const { control, handleSubmit, watch } = useForm({
    mode: "onTouched",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "familyMembers",
  });

  // Custom validation function to check if age matches the provided date of birth
  const validateDob = (value: string, index: number) => {
    const age = watch(`familyMembers[${index}].age`); 
    if (!value || !age) return true; 
    const dobDate = new Date(value);
    const currentDate = new Date();
    const yearsDiff = currentDate.getFullYear() - dobDate.getFullYear();
    const isAgeValid = yearsDiff === parseInt(age);
    return isAgeValid || "Date of Birth does not match the provided age";
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <IconButton
        onClick={() =>
          append({
            name: "",
            age: "",
            relationship: "",
            dob: "",
            email: "",
            phone: "",
          })
        }
      >
        <Add />
      </IconButton>
      <div className="step-card">
        {fields.map((field, index) => (
          <Box
            key={field.id}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <SharedInput
              name={`familyMembers[${index}].name`}
              control={control}
              label="Name"
              rules={{ required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Please enter a valid string for Relationship",
                }
               }}
            />
            <SharedInput
              name={`familyMembers[${index}].age`}
              control={control}
              label="Age"
              type="number"
              rules={{
                required: "Age is required",
                validate: {
                  positiveNumber: (value: number) =>
                    value >= 0 || "Age cannot be negative",
                  maxAge: (value: number) =>
                    value <= 100 || "Age should be less than or equal to 100",
                },
              }}
            />

            <SharedInput
              name={`familyMembers[${index}].relationship`}
              control={control}
              label="Relationship"
              rules={{ required: "Relationship is required", 
                pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Please enter a valid string for Relationship",
              } }}
            />
            <SharedInput
              name={`familyMembers[${index}].dob`}
              control={control}
              label="Date of Birth"
              type="date"
              rules={{
                required: "Date of Birth is required",
                validate: {
                  validDob: (value: string) => validateDob(value, index),
                },
              }}
            />
            <SharedInput
              name={`familyMembers[${index}].email`}
              control={control}
              label="Email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email is not valid",
                },
              }}
            />
            <SharedInput
              name={`familyMembers[${index}].phone`}
              control={control}
              label="Phone Number"
              rules={{
                required: "Phone Number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number is not valid",
                },
              }}
            />
            <IconButton onClick={() => remove(index)}>
              <Delete />
            </IconButton>
          </Box>
        ))}
      </div>
      <div className="button-container">
        {/* same common */}
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </div>
    </form>
  );
};

export default FamilyDetails;
