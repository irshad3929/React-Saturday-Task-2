// src/components/Stepper.tsx
import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Typography } from '@mui/material';

interface StepperProps {
  steps: string[];
  children: React.ReactElement<any, any>[];
}

// avoid any
const CustomStepper: React.FC<StepperProps> = ({ steps, children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const handleNext = (data: any) => {
    setFormData({ ...formData, ...data });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
// #same any
  const handleFinalSubmit = (data: any) => {
    const finalData = { ...formData, ...data };
    console.log('Final Data :', finalData);
    alert('Thank you!');
    setFormData({});
    setActiveStep(0);
  };

  return (
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {React.cloneElement(children[activeStep], {
          onSubmit: activeStep === steps.length - 1 ? handleFinalSubmit : handleNext,
          ...(activeStep === 2 && { familyMembers: formData.familyMembers || [], personalDetails: formData })
        })}
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop="16px">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
       
      </Box>
    </Box>
  );
};

export default CustomStepper;
