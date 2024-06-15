import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { type FormEvent, useEffect, useState } from 'react';

export interface PetFields {
  size: string;
  vac: string;
  petName: string;
  breed: string;
  birthDate: Date;
}

type SetFillState = (x: boolean) => void;
type SetPetDetState = (x: PetFields) => void;

interface PetProps {
  changeState: SetFillState;
  fillState: boolean;
  petDetails: PetFields;
  changePetState: SetPetDetState;
}

export default function PetDetails({ changeState, changePetState }: PetProps) {
  const [size, setSize] = useState('');
  const [vaccinated, setVac] = useState('');
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [dob, setDob] = useState<Date | null>(null);

  useEffect(() => {
    if (size && vaccinated && petName && breed && dob) {
      changeState(true);
      changePetState({
        petName,
        breed,
        size,
        vac: vaccinated,
        birthDate: new Date(dob),
      });
    } else {
      changeState(false);
    }
  }, [petName, breed, vaccinated, size, dob]);

  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        Copyright © Pawza {new Date().getFullYear()}.
      </Typography>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Submit data to backend
    // const data = new FormData(event.currentTarget);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        textAlign="start"
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="Pet Name"
                required
                fullWidth
                label="Pet Name"
                autoFocus
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Breed"
                name="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Vaccinated?</InputLabel>
                  <Select
                    labelId="Vaccinated"
                    value={vaccinated}
                    label="Size"
                    required
                    onChange={(e) => setVac(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Yes</MenuItem>
                    <MenuItem value={20}>No</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Size</InputLabel>
                  <Select label="Size" required value={size} onChange={(e) => setSize(e.target.value)}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>S</MenuItem>
                    <MenuItem value={20}>M</MenuItem>
                    <MenuItem value={30}>L</MenuItem>
                    <MenuItem value={40}>XL</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birth Date"
                  sx={{ width: '100%' }}
                  value={dayjs(dob)}
                  onChange={(newValue) => setDob(newValue?.toDate() || null)}
                  disableFuture
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
