import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useMutation } from '@tanstack/react-query';
import { Link, Navigate } from '@tanstack/react-router';
import { type ChangeEvent, type FormEvent, useState } from 'react';

import { setApiClientTokens } from '../../api/base';
import { login as loginApiCall } from '../../api/login';
import { useAuth } from '../Auth/useAuth';

export default function LoginPage() {
  const { rive, RiveComponent } = useRive({
    src: 'login_screen_character.riv',
    stateMachines: 'StateMachine1',
    autoplay: true,
    artboard: 'Artboard',
  });

  const handsUp = useStateMachineInput(rive, 'StateMachine1', 'hands_up');
  const check = useStateMachineInput(rive, 'StateMachine1', 'Check');
  const look = useStateMachineInput(rive, 'StateMachine1', 'Look');
  const success = useStateMachineInput(rive, 'StateMachine1', 'success');

  const { setUser, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openFailed, setOpenFailed] = useState(false);

  const {
    mutateAsync: login,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: { email: string; password: string }) => loginApiCall(data),
  });

  const animationHandle = () => {
    if (check) {
      check.value = true;
    }
  };

  const checkHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (handsUp && check && look) {
      handsUp.value = false;
      check.value = true;
      look.value = email.length * 3;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await login({ email, password });
      if (res.status === 200) {
        if (success) {
          success.fire();
        }

        const { user: newUser, token, refreshToken } = res.data;

        setUser(newUser);
        setApiClientTokens(token, refreshToken);
      }
    } catch (e) {
      setOpenFailed(true);
    }
  };

  if (user) {
    return <Navigate to="/home" />;
  }

  const showLoader = isPending || (isSuccess && !user);

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box sx={{ width: '100%', height: 200 }}>
          <RiveComponent />
        </Box>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {showLoader ? <CircularProgress size="50%" /> : <LockOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={checkHandle}
            onClick={() => (handsUp!.value = false)}
            disabled={showLoader}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{ mt: 0 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onSelect={() => (handsUp!.value = true)}
            disabled={showLoader}
          />
          <Button
            type="submit"
            onClick={() => animationHandle()}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main' }}
            disabled={showLoader}
          >
            Log in
          </Button>

          <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
        </Box>
      </Box>

      <Snackbar open={openFailed}>
        <Alert severity="error" onClose={() => setOpenFailed(false)}>
          Invalid credentials
        </Alert>
      </Snackbar>
    </Container>
  );
}
