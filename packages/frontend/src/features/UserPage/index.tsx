import { Avatar, Box, Button, Dialog, DialogActions, DialogTitle, Divider, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { decidePotentialMatch } from '../../api/potential-matches';
import { getUserProfile } from '../../api/users';
import PawButton from '../HomePage/PawButton';
import FullScreenLoader from '../Loader/FullScreenLoader';

export interface UserPageProps {
  userId: string;
}

function UserPage({ userId }: UserPageProps) {
  const {
    data: userProfile,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
  });

  const navigate = useNavigate();
  const [showLikedDialog, setShowLikedDialog] = useState(false);

  const { mutateAsync: callDecidePotentialMatch } = useMutation({
    mutationFn: (data: Parameters<typeof decidePotentialMatch>[0]) => decidePotentialMatch(data),
    onSuccess: (res) => setShowLikedDialog(true),
  });

  const [canPaw, setCanPaw] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setCanPaw(!userProfile.didYouLikeThem);
    }
  }, [userProfile]);

  if (isLoading) return <FullScreenLoader />;
  if (error || !userProfile) return <Box>Error loading user profile</Box>;

  const age = dayjs().diff(userProfile.birthDate, 'years');

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={2} alignItems="center">
        <Avatar
          src={userProfile.profilePictureSrc}
          alt={`${userProfile.firstName} ${userProfile.lastName}`}
          sx={{ width: 220, height: 220 }}
        />
        <Typography variant="h5" fontWeight="bold">
          {userProfile.firstName} {userProfile.lastName}, {age}
        </Typography>
        <Typography variant="body1">Gender: {userProfile.gender}</Typography>
        <Typography variant="body1">Purpose: {userProfile.purpose}</Typography>

        {!userProfile.didYouLikeThem && (
          <>
            <Divider sx={{ width: '100%', mt: 2 }} />
            <PawButton
              disabled={!canPaw}
              color="green"
              onClick={() => {
                callDecidePotentialMatch({ suggestedUserId: userId, decision: 'accept' });
                setCanPaw(false);
              }}
            />
          </>
        )}
      </Stack>

      {showLikedDialog && (
        <Dialog open={showLikedDialog} onClose={() => setShowLikedDialog(false)}>
          <DialogTitle>You&apos;ve sent a paw to {userProfile.firstName}!</DialogTitle>
          <DialogActions>
            <Button variant="contained" onClick={() => navigate({ to: '/home' })} color="primary">
              Home
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default UserPage;
