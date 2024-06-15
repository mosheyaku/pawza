import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

export interface MessageItemProps {
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

function Message({ content, timestamp, isCurrentUser }: MessageItemProps) {
  const dateText = (() => {
    const now = dayjs();
    const date = dayjs(timestamp);

    if (date.isSame(now, 'day')) {
      return date.format('HH:mm'); // Time in 24-hour format
    }

    if (date.isSame(now.subtract(1, 'day'), 'day')) {
      return `Yesterday ${date.format('HH:mm')}`;
    }

    if (date.isAfter(now.subtract(11, 'month'))) {
      return date.format('D MMMM HH:mm'); // Day in numbers and month in full text
    }
    return date.format('D MMMM YYYY HH:mm'); // Day in numbers, month in full text, and year
  })();

  return (
    <Box
      sx={{
        alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
        maxWidth: '60%',
        padding: '0.5rem',
        borderStartStartRadius: '1rem',
        borderStartEndRadius: '1rem',
        borderEndEndRadius: isCurrentUser ? 0 : '1rem',
        borderEndStartRadius: isCurrentUser ? '1rem' : 0,
        backgroundColor: isCurrentUser ? '#DCF8C6' : '#F0F0F0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        wordBreak: 'break-word',
      }}
    >
      <Typography variant="body1" textAlign="left">
        {content}
      </Typography>
      <Typography
        variant="caption"
        sx={{ display: 'block', textAlign: isCurrentUser ? 'right' : 'left', color: '#888' }}
      >
        {dateText}
      </Typography>
    </Box>
  );
}

export default Message;
