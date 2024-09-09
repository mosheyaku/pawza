import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getNotifications } from '../../api/notifications';
import FullScreenLoader from '../Loader/FullScreenLoader';
import Notification from './Notification';

function NotificationsPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  if (isLoading) return <FullScreenLoader />;
  if (error || !data) return <Box>Error loading notifications</Box>;

  return (
    <Box sx={{ py: '1rem' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', color: '#333' }}>
        Notifications
      </Typography>

      {data.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          title={notification.title}
          content={notification.content}
          read={notification.read}
          image={notification.image}
          pawedBy={notification.pawedBy}
        />
      ))}

      {data.length === 0 && (
        <Typography variant="h4" sx={{ marginTop: '3rem', textAlign: 'center', color: '#777' }}>
          {"You don't have any notifications yet, but when you do, you'll see them here!"}
        </Typography>
      )}
    </Box>
  );
}

export default NotificationsPage;
