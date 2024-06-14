import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, IconButton, TextField, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { type Chat, fetchChat, fetchMessages, type Message, sendMessage } from '../../api/chats';
import { useAuth } from '../Auth/useAuth';
import FullScreenLoader from '../Loader/FullScreenLoader';
import MessageItem from './Message/MessageItem'; // Import MessageItemProps

function ChatArea({ chatId }: { chatId: string }) {
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();

  // Fetch chat information
  const { data: chat, isLoading: isLoadingChat, error: chatError } = useQuery<Chat>({
    queryKey: ['chats', chatId],
    queryFn: () => fetchChat(chatId),
  });

  // Fetch messages using useQuery with polling every 2 seconds
  const { data: messages = [], isLoading: isLoadingMessages, error: messagesError } = useQuery<Message[]>({
    queryKey: ['chats', chatId, 'messages'],
    queryFn: () => fetchMessages(chatId),
    refetchInterval: 2000,
  });

  // Mutation for sending a message
  const mutation = useMutation({
    mutationFn: ({ content }: { content: string }) => sendMessage(chatId, content),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['chats', chatId, 'messages']);
    },
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      await mutation.mutateAsync({ content: newMessage });
      setNewMessage('');
    }
  };

  const error = chatError || messagesError;

  if (isLoadingChat || isLoadingMessages) {
    return <FullScreenLoader />;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e0e0e0',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
              {chat?.matchedUser.firstName.charAt(0)}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {chat?.matchedUser.firstName} {chat?.matchedUser.lastName}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: '#fff',
            overflowY: 'auto',
          }}
        >
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              content={message.content}
              timestamp={new Date(message.timestamp)}
              isCurrentUser={message.senderId === user!.id}
            />
          ))}
        </Box>
        <Box
          component="form"
          onSubmit={handleSendMessage}
          display="flex"
          gap="1rem"
          sx={{
            padding: '1rem',
            backgroundColor: '#fff',
            boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid #E0E0E0',
          }}
        >
          <TextField
            variant="outlined"
            sx={{
              background: 'white',
              flexGrow: 1,
              borderRadius: '1rem',
            }}
            InputProps={{
              style: { borderRadius: '1rem' },
              endAdornment: (
                <IconButton type="submit">
                  <SendIcon />
                </IconButton>
              ),
            }}
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ChatArea;
