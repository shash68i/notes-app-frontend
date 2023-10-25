import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import { StyledWrapper } from './StyledWrapper';

export default function MuiModal({
  isOpen,
  onClose,
  title,
  children,
  primaryButtonText,
  onClickPrimary,
  primaryDisabled,
  ...props
}) {
  return (
    <StyledWrapper>
      <Dialog
        maxWidth="md"
        fullWidth
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        {...props}
      >
        <DialogTitle id="customized-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>

        <DialogActions className="action-btn-group">
          <Button variant="outlined" autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={primaryDisabled}
            variant="contained"
            autoFocus
            onClick={onClickPrimary}
          >
            {primaryButtonText || 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </StyledWrapper>
  );
}
