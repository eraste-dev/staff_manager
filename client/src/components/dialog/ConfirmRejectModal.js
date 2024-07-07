import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField } from '@mui/material';

const ConfirmRejectModal = ({
  title,
  message,
  confirmText,
  cancelText,
  handleDelete,
  open,
  handleClose,
  onChangeReject,
  rejectReason,
}) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          <Typography variant="body1">{message}</Typography>

          <TextField
            label="Motif de refus"
            fullWidth
            onChange={onChangeReject}
            value={rejectReason}
            sx={{ mt: 3 }}
            multiline
            rows={4}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {cancelText}
          </Button>

          <Button onClick={handleDelete} color="error" disabled={!rejectReason || rejectReason == ''}>
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ConfirmRejectModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  // onDelete: PropTypes.func.isRequired,
  // onClose: PropTypes.func.isRequired,
};

export default ConfirmRejectModal;
