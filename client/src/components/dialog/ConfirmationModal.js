import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

const ConfirmationModal = ({ title, message, confirmText, cancelText, handleDelete, open, handleClose }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          <Typography variant="body1">{message}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            {cancelText}
          </Button>

          <Button onClick={handleDelete} variant="outlined" color="secondary">
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  // onDelete: PropTypes.func.isRequired,
  // onClose: PropTypes.func.isRequired,
};

export default ConfirmationModal;
