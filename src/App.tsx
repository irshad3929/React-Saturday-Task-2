// src/App.tsx
import React, { useState } from 'react';
import CustomStepper from './components/Stepper';
import PersonalDetails from './pages/PersonalDetails';
import FamilyDetails from './pages/FamilyDetails';
import PhotoUpload from './pages/PhotoUpload';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import './App.css';

const App: React.FC = () => {
  const steps = ['Personal Details', 'Family Details', 'Upload Photos'];
  const [personalData, setPersonalData] = useState({});
  const [familyData, setFamilyData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalData, setFinalData] = useState<any>(null);

  const handlePersonalDetailsSubmit = (data: any) => {
    setPersonalData(data);
    console.log('Personal Data:', data);
  };

  const handleFamilyDetailsSubmit = (data: any) => {
    setFamilyData(data.familyMembers);
    console.log('Family Data:', data);
  };

  const handleFinalSubmit = (data: any) => {
    const finalFormData = { personalData, familyData, photos: data.familyMembers };
    setFinalData(finalFormData);
    setIsSubmitted(true);
    console.log('Final Data 2:', data);
  };

  return (
    <Box>
      {!isSubmitted ? (
        <CustomStepper steps={steps}>
          <PersonalDetails onSubmit={handlePersonalDetailsSubmit} />
          <FamilyDetails onSubmit={handleFamilyDetailsSubmit} />
          <PhotoUpload 
            onSubmit={handleFinalSubmit} 
            familyMembers={familyData} 
            isSubmitted={isSubmitted} 
          />
        </CustomStepper>
      ) : (
        <Box>
          <Typography variant="h4" gutterBottom>
            Final Submitted Data
          </Typography>
          <Card style={{ marginBottom: '16px' }}>
            <CardContent>
              <Typography variant="h6">Personal Details</Typography>
              <Typography variant="body2">Name: {finalData.personalData.name}</Typography>
              <Typography variant="body2">Date of Birth: {finalData.personalData.dob}</Typography>
              <Typography variant="body2">Phone: {finalData.personalData.phone}</Typography>
              <Typography variant="body2">Email: {finalData.personalData.email}</Typography>
              <Typography variant="body2">Address: {finalData.personalData.address}</Typography>
            </CardContent>
          </Card>
          {finalData.familyData.map((member: any, index: number) => (
            <Card key={index} style={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant="h6">Family Member {index + 1}</Typography>
                <Typography variant="body2">Name: {member.name}</Typography>
                <Typography variant="body2">Age: {member.age}</Typography>
                <Typography variant="body2">Relationship: {member.relationship}</Typography>
                <Typography variant="body2">Date of Birth: {member.dob}</Typography>
                <Typography variant="body2">Email: {member.email}</Typography>
                <Typography variant="body2">Phone: {member.phone}</Typography>
                {member.photo && (
                  <CardMedia
                    component="img"
                    image={URL.createObjectURL(member.photo[0])}
                    title="Family Member Photo"
                    style={{ width: 150, marginTop: '16px' }}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default App;
