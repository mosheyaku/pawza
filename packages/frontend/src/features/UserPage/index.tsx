import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getUserProfile } from '../../api/users';
import FullScreenLoader from '../Loader/FullScreenLoader';

export interface UserPageProps {
  userId: string;
}

function UserPage({ userId }: UserPageProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
  });

  if (isLoading) return <FullScreenLoader />;
  if (error || !data) return <Box>Error loading notifications</Box>;

  // TODO: MAKE USER PROFILE PAGE!

  return <div>UserPage of {userId}</div>;
}

export default UserPage;
