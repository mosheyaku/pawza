import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, IconButton, TextField, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import {
  type Chat as ChatInterface,
  fetchChat,
  fetchMessages,
  type Message as MessageInterface,
  sendMessage,
} from '../../../api/chats';
import { useAuth } from '../../Auth/useAuth';
import FullScreenLoader from '../../Loader/FullScreenLoader';
import Message from './Message';

function ChatPage({ chatId }: { chatId: string }) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const { user } = useAuth();
  const scrollableAreaRef = useRef<HTMLDivElement>(null);

  // Fetch chat information
  const {
    data: chat,
    isLoading: isLoadingChat,
    error: chatError,
  } = useQuery<ChatInterface>({
    queryKey: ['chats', chatId],
    queryFn: () => fetchChat(chatId),
  });

  // Fetch messages using useQuery with polling every 2 seconds
  const {
    data: messagesFromServer = [],
    isLoading: isLoadingMessages,
    error: messagesError,
  } = useQuery<MessageInterface[]>({
    queryKey: ['chats', chatId, 'messages'],
    queryFn: () => fetchMessages(chatId),
    refetchInterval: 2000,
  });

  useEffect(() => {
    if (messagesFromServer.length > messages.length) {
      setMessages(messagesFromServer);
    }
  }, [messages.length, messagesFromServer]);

  useEffect(() => {
    if (scrollableAreaRef.current) {
      scrollableAreaRef.current.scrollTop = scrollableAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Mutation for sending a message
  const { mutateAsync: sendMessageMutation } = useMutation({
    mutationFn: (content: string) => sendMessage(chatId, content),
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      setNewMessage('');
      setMessages((p) => [
        ...p,
        {
          content: newMessage,
          senderId: user!.id,
          timestamp: new Date().toISOString(),
        },
      ]);

      await sendMessageMutation(newMessage);
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
        width: '100%',
        height: '100%',
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
          gap: '0.75rem',
          backgroundColor: '#fff',
          overflowY: 'auto',
        }}
        ref={scrollableAreaRef}
      >
        {messages.map((message) => (
          <Message
            key={`${message.senderId}_${message.timestamp}`}
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
          autoComplete="off"
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
  );
}

export default ChatPage;
