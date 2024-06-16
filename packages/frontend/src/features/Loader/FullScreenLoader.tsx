import { Box, CircularProgress } from '@mui/material';

function FullScreenLoader() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress sx={{ py: '12lvh' }} />
    </Box>
  );
}

export default FullScreenLoader;
