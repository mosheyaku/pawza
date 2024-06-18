import { IconButton, keyframes } from '@mui/material';
import PawSvg from '@src/assets/paw.svg?react';
import { type ComponentPropsWithRef, type MouseEventHandler, useState } from 'react';

const slideUpFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-60%);
  }
`;

function PawButton({
  color,
  sx,
  ...props
}: Omit<ComponentPropsWithRef<typeof IconButton>, 'color'> & { color?: 'green' | 'red' }) {
  const [animate, setAnimate] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setAnimate(true);
    props.onClick?.(e);

    setTimeout(() => setAnimate(false), 1000);
  };

  let fill = '#00BB55';
  if (color === 'red') {
    fill = '#CE0000';
  }

  return (
    // TODO: onClick animation
    <IconButton
      {...props}
      sx={{ width: 'min(33%, 26vw, 15vh)', aspectRatio: 1, position: 'relative', ...sx }}
      disabled={animate || props.disabled}
      onClick={handleClick}
    >
      <PawSvg fill={fill} width="100%" height="100%" />

      {animate && (
        <IconButton
          sx={{
            width: '100%',
            aspectRatio: 1,
            pointerEvents: 'none',
            position: 'absolute',
            animation: `${slideUpFadeOut} 0.4s ease-out forwards`,
          }}
          {...props}
        >
          <PawSvg fill={fill} width="100%" height="100%" />
        </IconButton>
      )}
    </IconButton>
  );
}

export default PawButton;
