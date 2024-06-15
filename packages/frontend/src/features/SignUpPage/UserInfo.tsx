import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Link } from '@tanstack/react-router';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

export interface UserFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
}

type SetUserInfoState = (x: UserFields) => void;
type SetFillState = (x: boolean) => void;

interface UserProps {
  setUserInfo: SetUserInfoState;
  changeState: SetFillState;
  initialState: UserFields;
}

export default function UserInfo({ setUserInfo, changeState, initialState }: UserProps) {
  const [firstName, setFirstName] = useState<string>(initialState.firstName);
  const [lastName, setLastName] = useState<string>(initialState.lastName);
  const [email, setEmail] = useState<string>(initialState.email);
  const [password, setPassword] = useState<string>(initialState.password);

  const [wasFirstNameChanged, setWasFirstNameChanged] = useState(false);
  const [wasLastNameChanged, setWasLastNameChanged] = useState(false);
  const [wasEmailChanged, setWasEmailChanged] = useState(false);
  const [wasPasswordChanged, setWasPasswordChanged] = useState(false);

  const [birthDate, setBirthDate] = useState<Date | null>(initialState.birthDate);
  const [emailHasError, setEmailHasError] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const onEmailChange = (val: string) => {
    // don't remember from where i copied this code, but this works.
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

    setEmail(val);
    setEmailHasError(!re.test(val));
  };

  const onPasswordChange = (val: string) => {
    // At least one English letter
    const t1 = /[A-Za-z]/;
    // At least 1 digit
    const t2 = /\d/;
    // At least 8 characters
    const t3 = /^.{8,}/;

    const newPasswordErrors: string[] = [];
    if (!t1.test(val)) {
      newPasswordErrors.push('Please enter at least 1 English letter');
    }

    if (!t2.test(val)) {
      newPasswordErrors.push('Please enter at least 1 digit');
    }

    if (!t3.test(val)) {
      newPasswordErrors.push('Please enter at least 8 characters');
    }

    setPasswordErrors(newPasswordErrors);
    setPassword(val);
  };

  useEffect(() => {
    if (firstName && lastName && email && password && birthDate) {
      changeState(true);
      setUserInfo({
        firstName,
        lastName,
        email,
        password,
        birthDate: new Date(birthDate),
      });
    } else {
      changeState(false);
    }
  }, [firstName, lastName, email, password, birthDate]);

  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        Copyright © Pawza {new Date().getFullYear()}.
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate mt={3} textAlign="start">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setWasFirstNameChanged(true);
                }}
                error={wasFirstNameChanged && firstName === ''}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setWasLastNameChanged(true);
                }}
                error={wasLastNameChanged && lastName === ''}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Gender"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setWasLastNameChanged(true);
                }}
                error={wasLastNameChanged && lastName === ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={email}
                onChange={(e) => {
                  onEmailChange(e.target.value);
                  setWasEmailChanged(true);
                }}
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                error={wasEmailChanged && (email === '' || emailHasError)}
              />
            </Grid>
            <Grid item xs={12}>
              {
                <>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      onPasswordChange(e.target.value);
                      setWasPasswordChanged(true);
                    }}
                    error={wasPasswordChanged && (password === '' || passwordErrors.length !== 0)}
                  />

                  {passwordErrors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </>
              }
            </Grid>
            <Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birth Date"
                  sx={{ width: '100%' }}
                  value={birthDate && dayjs(birthDate)}
                  onChange={(newValue: Dayjs | null) => setBirthDate(newValue?.toDate() || null)}
                  maxDate={dayjs().subtract(18, 'years')}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">{'Already have an account? Log in'}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
