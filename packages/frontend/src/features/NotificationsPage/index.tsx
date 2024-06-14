import { Box } from '@mui/material';
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
    <Box my={1}>
      {data.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          title={notification.title}
          content={notification.content}
          read={notification.read}
        />
      ))}
    </Box>
  );
}

export default NotificationsPage;
