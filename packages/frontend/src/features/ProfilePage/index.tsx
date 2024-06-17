import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Avatar, Box, Button, Snackbar, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import { uploadProfileImage } from '../../api/profile';
import { useAuth } from '../Auth/useAuth';

export default function ProfilePage() {
  const { user, setUser } = useAuth();

  const [alertMessage, setAlertMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadProfileImageMutation, isPending } = useMutation({
    mutationFn: (file: File) => uploadProfileImage(file),
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    try {
      const file = event.target.files[0];

      const res = await uploadProfileImageMutation(file);

      setUser({
        ...user!,
        profilePictureSrc: res.data.filename,
      });

      // Reset file input
      event.target.value = '';
    } catch (error) {
      setAlertMessage('Failed to upload image.');
    }
  };

  return (
    <Box height="100%">
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            borderRadius: '50%',
            pt: 8,
            width: '50%',
            aspectRatio: 1,
            overflow: 'hidden',
          }}
        >
          <Button
            sx={{
              borderRadius: '50%',
              width: '100%',
              height: '100%',
            }}
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending}
          >
            <Avatar
              src={user?.profilePictureSrc}
              alt="Profile Picture"
              style={{
                width: '100%',
                height: '100%',
                border: '2px solid #fff',
                boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
                filter: isPending ? 'brightness(50%)' : '',
              }}
            />
            {!isPending && (
              <Box
                style={{
                  position: 'absolute',
                  top: '98%',
                  left: '50%',
                  transform: 'translate(-50%, -100%)',
                }}
              >
                {user?.profilePictureSrc ? (
                  <EditIcon
                    style={{
                      color: '#fff',
                      fontSize: '3rem',
                    }}
                  />
                ) : (
                  <AddPhotoAlternateIcon
                    style={{
                      color: '#fff',
                      fontSize: '3rem',
                    }}
                  />
                )}
              </Box>
            )}
          </Button>
        </Box>
      </Box>

      <Typography variant="h4" sx={{ mt: 4 }}>
        {user!.firstName} {user!.lastName}
      </Typography>

      <input
        ref={fileInputRef}
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={isPending}
      />

      <Snackbar open={!!alertMessage} autoHideDuration={6000} onClose={() => setAlertMessage('')}>
        <Alert severity="error" onClose={() => setAlertMessage('')}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
