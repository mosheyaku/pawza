import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

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

export default function PetDetails({ changeState, changePetState, petDetails }: PetProps) {
  const [size, setSize] = useState<string>(petDetails.size);
  const [vaccinated, setVac] = useState<string>(petDetails.vac);
  const [petName, setPetName] = useState<string>(petDetails.petName);
  const [breed, setBreed] = useState<string>(petDetails.breed);
  const [petDob, setPetDob] = useState<Date | null>(petDetails.birthDate);

  const [wasPetNameChanged, setWasPetNameChanged] = useState(false);
  const [wasBreedChanged, setWasBreedChanged] = useState(false);
  const [wasVaccinatedChanged, setWasVaccinatedChanged] = useState(false);
  const [wasSizeChanged, setWasSizeChanged] = useState(false);

  useEffect(() => {
    if (size && vaccinated && petName && breed && petDob) {
      changeState(true);
      changePetState({
        petName,
        breed,
        size,
        vac: vaccinated,
        birthDate: new Date(petDob),
      });
    } else {
      changeState(false);
    }
  }, [petName, breed, vaccinated, size, petDob, changeState, changePetState]);

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
        textAlign="start"
      >
        <Box component="form" noValidate sx={{ mt: 4 }}>
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
                onChange={(e) => {
                  setPetName(e.target.value);
                  setWasPetNameChanged(true);
                }}
                error={wasPetNameChanged && petName === ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Breed"
                name="breed"
                value={breed}
                onChange={(e) => {
                  setBreed(e.target.value);
                  setWasBreedChanged(true);
                }}
                error={wasBreedChanged && breed === ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <FormControl fullWidth>
                  <TextField
                    select
                    value={vaccinated}
                    label="Vaccinated"
                    required
                    onChange={(e) => {
                      setVac(e.target.value);
                      setWasVaccinatedChanged(true);
                    }}
                    error={wasVaccinatedChanged && vaccinated === ''}
                  >
                    <MenuItem value={10}>Yes</MenuItem>
                    <MenuItem value={20}>No</MenuItem>
                  </TextField>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Size"
                    required
                    value={size}
                    onChange={(e) => {
                      setSize(e.target.value);
                      setWasSizeChanged(true);
                    }}
                    error={wasSizeChanged && size === ''}
                  >
                    <MenuItem value={10}>S</MenuItem>
                    <MenuItem value={20}>M</MenuItem>
                    <MenuItem value={30}>L</MenuItem>
                    <MenuItem value={40}>XL</MenuItem>
                  </TextField>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Pet Birthday"
                  sx={{ width: '100%' }}
                  value={petDob && dayjs(petDob)}
                  onChange={(newValue: Dayjs | null) => setPetDob(newValue?.toDate() || null)}
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
