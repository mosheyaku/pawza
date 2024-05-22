import { Box, Typography } from '@mui/material';

interface ImageCardProps {
  name: string;
  age: number;
  description: string;
  image: string;
}

function ImageCard({ name, age, description, image }: ImageCardProps) {
  return (
    <Box position="relative" borderRadius="2rem">
      <img style={{ borderRadius: '2rem', width: '100%' }} src={image} />
      <Box
        py="0.5rem"
        position="absolute"
        bottom={0}
        left={0}
        bgcolor="rgba(0, 0, 0, 0.4)"
        color="white"
        width="100%"
        borderRadius="0 0 2rem 2rem"
      >
        <Typography variant="h6">
          {name}, {age}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );
}

export default ImageCard;
