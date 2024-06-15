import { Checkbox, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const DUMMY_TERMS = [...new Array(50)]
  .map(
    () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
  )
  .join('\n');

type SetCheckState = (x: boolean) => void;

interface TermsProps {
  checkChange: SetCheckState;
  checkState: boolean;
}

export default function Terms({ checkChange, checkState }: TermsProps) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(checkState);

  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const toggleAcceptTerms = (value: boolean) => {
    setChecked(value);
    checkChange(value);
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
          toggleAcceptTerms(false);
        }}
      >
        Read the terms and conditions
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} scroll="paper">
        <DialogTitle>Subscribe</DialogTitle>

        <DialogContent dividers={true}>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            {DUMMY_TERMS}
          </DialogContentText>

          <div ref={ref}></div>
        </DialogContent>

        <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', px: '1rem' }}>
          <FormControlLabel
            control={
              <Checkbox
                value="allowExtraEmails"
                color="primary"
                checked={checked}
                onChange={(e) => toggleAcceptTerms(e.target.checked)}
              />
            }
            label="I agree to the terms & conditions"
            disabled={!inView}
          />

          <Button onClick={() => setOpen(false)} disabled={!checked}>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
