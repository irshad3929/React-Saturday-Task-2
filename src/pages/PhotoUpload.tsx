import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, Button, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import SharedFileInput from '../components/SharedFileInput';
import './PhotoUpload.css';

interface FamilyMember {
  name: string;
  age: string;
  relationship: string;
  dob: string;
  email: string;
  phone: string;
  photo?: FileList;
}

interface PhotoUploadProps {
  onSubmit: (data: any) => void;
  familyMembers: FamilyMember[];
  isSubmitted: boolean;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onSubmit, familyMembers, isSubmitted }) => {
  const { control, handleSubmit, watch } = useForm({
    mode: 'onTouched',
    defaultValues: { familyMembers },
  });
  const { fields, remove } = useFieldArray({
    control,
    name: 'familyMembers',
  });

  const [photos, setPhotos] = useState<Record<number, string>>({});
  const [showUploadForm, setShowUploadForm] = useState(!isSubmitted);

  const watchPhoto = watch('familyMembers');

  const handlePhotoChange = (index: number, photo: FileList | null) => {
    if (photo && photo.length > 0) {
      const photoURL = URL.createObjectURL(photo[0]);
      setPhotos((prevPhotos) => ({ ...prevPhotos, [index]: photoURL }));
    }
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    setShowUploadForm(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='form-design'>
      {showUploadForm ? (
        <>
          <Typography variant="h4">Upload Photos</Typography>
          {fields.map((field, index) => {
            const photo = watchPhoto?.[index]?.photo;``
            return (
              <Card key={field.id} className='card-design'>
                <CardContent className='card-content'>
                  <Typography variant="h6">{field.name}</Typography>
                  <Typography variant="body2">Age: {field.age}</Typography>
                  <Typography variant="body2">Relationship: {field.relationship}</Typography>
                  <Typography variant="body2">DOB: {field.dob}</Typography>
                  <Typography variant="body2">Email: {field.email}</Typography>
                  <Typography variant="body2">Phone: {field.phone}</Typography>
                  <SharedFileInput
                    name={`familyMembers[${index}].photo`}
                    control={control}
                    label="Upload Photo"
                    rules={{ required: 'Photo is required' }}
                    onChange={(e) => handlePhotoChange(index, e.target.files)}
                  />
                </CardContent>
                <div className='photo-upload-image-container'>
                  {photos[index] && (
                    <CardMedia
                      className='photo-upload-image'
                      component="img"
                      image={photos[index]}
                      title="Family Member Photo"
                    />
                  )}
                </div>
                <IconButton onClick={() => remove(index)} className='delete-button'>
                  <Delete />
                </IconButton>
              </Card>
            );
          })}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </>
      ) : (
        // make it vommon
        <Box>
          <Typography variant="h6">Submitted Family Members Details</Typography>
          {familyMembers.map((member, index) => (
            <Card key={index} className='card-design'>
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
                    className='photo-upload-image'
                    component="img"
                    src={photos[index]} // Display image using URL
                    title="Family Member Photo"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </form>
  );
};

export default PhotoUpload;


