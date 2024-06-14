import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';

export type ChatItemProps = {
  name: string;
  lastMessage: string;
  to: string;
};

function ChatItem({ name, lastMessage, to }: ChatItemProps) {
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
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Avatar sx={{ bgcolor: '#3f51b5', marginRight: '1rem', fontSize: '1.25rem' }}>
        {name[0]}
      </Avatar>
      <CardContent sx={{ flex: '1', padding: '0.5rem' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '0.5rem' }}>
          {lastMessage}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ChatItem;
