import { IconButton } from '@mui/material';
import PawSvg from '@src/assets/paw.svg?react';
import { type ComponentPropsWithRef } from 'react';

function PawButton({
  color,
  ...props
}: Omit<ComponentPropsWithRef<typeof IconButton>, 'color'> & { color?: 'green' | 'red' }) {
  let fill = '#00BB55';
  if (color === 'red') {
    fill = '#CE0000';
  }

  return (
    // TODO: onClick animation
    <IconButton sx={{ padding: '0.25rem', width: '33%', aspectRatio: 1 }} {...props}>
      <PawSvg fill={fill} width="100%" height="100%" />
    </IconButton>
  );
}

export default PawButton;
