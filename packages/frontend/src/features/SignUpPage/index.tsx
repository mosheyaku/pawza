import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { Gender } from '../../api/me';
import { signUp, type SignUpData } from '../../api/sign-up';
import FullScreenLoader from '../Loader/FullScreenLoader';
import PetDetails, { type PetFields } from './PetDetails';
import Terms from './TermsAndConditions';
import UserInfo, { type NonNullUserFields, type UserFields } from './UserInfo';

const steps = ['User Details', 'Pet Details', 'Terms & Conditions'];

export default function SignUpPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [checked, setChecked] = useState(false);
  const [petFill, setPetFill] = useState(false);
  const [userFill, setUserFill] = useState(false);

  const [userInfo, setUserInfo] = useState<UserFields>({
    firstName: '',
    lastName: '',
    gender: '',
    genderPreference: '',
    purpose: '',
    email: '',
    password: '',
    birthDate: null, // Itamar approved
    location: null,
  });

  const navigate = useNavigate();

  const { mutateAsync: signUpMutation, isPending } = useMutation({
    mutationFn: (data: SignUpData) => signUp(data),
  });

  const [petDet, setPetDet] = useState<PetFields>({
    size: '',
    vac: '',
    petName: '',
    breed: '',
    birthDate: null as any, // Itamar approved
  });

  const handleNext = async () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      await signUpMutation({
        ...(userInfo as NonNullUserFields),
        genderPreference:
          userInfo.genderPreference === 'dontcare' ? [Gender.Man, Gender.Woman] : [userInfo.genderPreference as Gender],
        location: [userInfo.location!.latitude, userInfo.location!.longitude],
      });
      navigate({ to: '/home' });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const shouldDisableContinueButton = () => {
    if (activeStep === 0) {
      return !userFill;
    }

    if (activeStep === 1) {
      return !petFill;
    }

    return !checked;
  };

  return (
    <Box sx={{ width: '100%', py: '6lvh', px: 2, boxSizing: 'border-box' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {isPending ? (
        <FullScreenLoader />
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep]}</Typography>
          <Box>
            {activeStep === 0 && (
              <UserInfo initialState={userInfo} setUserInfo={setUserInfo} setUserFill={setUserFill} />
            )}

            {activeStep === 1 && (
              <PetDetails changeState={setPetFill} fillState={petFill} petDetails={petDet} changePetState={setPetDet} />
            )}

            {activeStep === 2 && <Terms checkChange={setChecked} checkState={checked} />}
            {activeStep === 3 && <Typography>All done! Logging you in...</Typography>}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {activeStep !== 0 && (
              <Button
                variant="contained"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}

            <Box sx={{ flex: '1 1 auto' }} />
            <Button variant="contained" disabled={shouldDisableContinueButton()} onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
