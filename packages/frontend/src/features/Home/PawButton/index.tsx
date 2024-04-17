import { IconButton, SvgIcon } from '@mui/material';
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
    <IconButton sx={{ padding: '0.25rem', fontSize: '4rem' }} {...props}>
      <SvgIcon fontSize="inherit">
        <PawSvg fill={fill} />;
      </SvgIcon>
    </IconButton>
  );
}

export default PawButton;
