// src/pages/DetailsPage.tsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface DetailsPageProps {
  personalDetails: any;
  familyMembers: any[];
}

const DetailsPage: React.FC<DetailsPageProps> = ({ personalDetails, familyMembers }) => {
  return (
    <Box>
      <Card style={{ marginBottom: '16px' }}>
        <CardContent>
          <Typography variant="h6">Personal Details</Typography>
          <Typography variant="body2">Name: {personalDetails.name}</Typography>
          <Typography variant="body2">Date of Birth: {personalDetails.dob}</Typography>
          <Typography variant="body2">Phone: {personalDetails.phone}</Typography>
          <Typography variant="body2">Email: {personalDetails.email}</Typography>
          <Typography variant="body2">Address: {personalDetails.address}</Typography>
        </CardContent>
      </Card>
      {familyMembers.map((member, index) => (
        <Card key={index} style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '16px' }}>
          <CardContent style={{ flex: '1 0 auto' }}>
            <Typography variant="h6">{member.name}</Typography>
            <Typography variant="body2">Age: {member.age}</Typography>
            <Typography variant="body2">Relationship: {member.relationship}</Typography>
            <Typography variant="body2">DOB: {member.dob}</Typography>
            <Typography variant="body2">Email: {member.email}</Typography>
            <Typography variant="body2">Phone: {member.phone}</Typography>
          </CardContent>
          {member.photo && (
            <CardMedia
              component="img"
              image={URL.createObjectURL(member.photo[0])}
              title="Family Member Photo"
              style={{ width: 150 }}
            />
          )}
        </Card>
      ))}
    </Box>
  );
};

export default DetailsPage;
