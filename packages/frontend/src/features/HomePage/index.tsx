import { Box } from '@mui/material';
import GuyWithDog from '@src/assets/guy_with_dog.webp';
import WomanWithDog from '@src/assets/woman_with_dog.jpg';
import { useState } from 'react';

import ImageCard from './ImageCard';
import PawButton from './PawButton';

function Home() {
  const [guy, setGuy] = useState(true);

  return (
    <Box
      p={4}
      sx={{
        height: '100%',
        boxSizing: 'border-box',
        gap: '3rem',
      }}
      display="flex"
      flexDirection="column"
      justifyContent="end"
    >
      <ImageCard src={GuyWithDog} style={{ display: !guy ? 'none' : '' }} />
      <ImageCard src={WomanWithDog} style={{ display: guy ? 'none' : '' }} />

      <Box display="flex" flexDirection="row" justifyContent="space-between" px={4}>
        <PawButton color="red" onClick={() => setGuy((p) => !p)} />
        <PawButton color="green" onClick={() => setGuy((p) => !p)} />
      </Box>
    </Box>
  );
}

export default Home;
