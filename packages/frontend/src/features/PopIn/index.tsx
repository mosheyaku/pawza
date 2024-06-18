import { keyframes } from '@emotion/react';
import { Box } from '@mui/material';
import { type PropsWithChildren } from 'react';

const slideInAnimation = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0.5;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

function PopIn({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          animation: `${slideInAnimation} 0.1s ease-out forwards`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default PopIn;
