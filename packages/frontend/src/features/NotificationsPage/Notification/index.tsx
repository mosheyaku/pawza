import CircleIcon from '@mui/icons-material/Circle';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { markNotificationAsRead } from '../../../api/notifications';

export interface NotificationProps {
  id: string;
  title: string;
  content: string;
  read: boolean;
  image?: string;
}

function Notification({ id, content, read, title, image }: NotificationProps) {
  const [isNew, setIsNew] = useState(!read);
  const queryClient = useQueryClient();
  const { mutateAsync: markAsRead } = useMutation({
    mutationFn: () => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unreadNotificationsCount'] });
      setIsNew(false);
    },
  });

  const onClick = async () => {
    if (!read) {
      await markAsRead();
    }
  };

  return (
    <Button
      onClick={onClick}
      fullWidth
      sx={{
        bgcolor: isNew ? 'white' : 'rgba(255, 255, 255, 0.5)',
        padding: '1rem',
        border: '1px solid #f0f0f0',
        textTransform: 'none',
      }}
    >
      <Box display="flex" width="100%" alignItems="center" textAlign="left">
        {isNew && <CircleIcon color="primary" style={{ marginRight: '0.5rem', fontSize: '0.5rem' }} />}
        {image && <Avatar src={`data:image/png;base64,${image}`} style={{ marginRight: '0.5rem' }} />}
        <Box>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {content}
          </Typography>
        </Box>
      </Box>
    </Button>
  );
}

export default Notification;
