import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';

export type ChatItemProps = {
  profilePic?: string;
  name: string;
  lastMessage: string;
  to: string;
};

function ChatItem({ profilePic, name, lastMessage, to }: ChatItemProps) {
  return (
    <Card
      component={Link}
      to={to}
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        margin: '0.5rem 0',
        padding: '0.5rem',
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {profilePic ? (
        <Avatar
          sx={{ bgcolor: '#3f51b5', marginRight: '1rem', fontSize: '2rem', width: '64px', height: '64px' }}
          src={profilePic}
        />
      ) : (
        <Avatar sx={{ bgcolor: '#3f51b5', marginRight: '1rem', fontSize: '2rem', width: '64px', height: '64px' }}>
          {name.charAt(0)}
        </Avatar>
      )}
      <CardContent sx={{ flex: '1', padding: '0.5rem' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
          {name}
        </Typography>
        <Typography
          variant="body2"
          color={lastMessage ? 'text.primary' : 'text.secondary'}
          sx={{
            marginTop: '0.5rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            height: '3em',
            lineHeight: '1.5em',
          }}
        >
          {lastMessage || 'No messages yet'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ChatItem;
