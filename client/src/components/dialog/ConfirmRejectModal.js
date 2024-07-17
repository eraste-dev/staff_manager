import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField } from '@mui/material';
import ConfirmationModal from './ConfirmationModal';

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
  statusSelected,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const [confirmTitle, setConfirmTitle] = useState('Confirmation le refus de la demande');
  const [confirmMessage, setConfirmMessage] = useState('Êtes-vous de vouloir refuser cette demande ?');

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirmReject = () => {
    handleDelete();
    setOpenConfirm(false);
  };

  useEffect(() => {
    console.log(statusSelected);
  }, [statusSelected]);

  useEffect(() => {
    if (open && statusSelected && statusSelected != 'REJECTED') {
      setConfirmTitle('Confirmation de changement de status');
      setConfirmMessage('Êtes-vous de vouloir changer le statut de cette demande ?');
      setOpenConfirm(true);
      handleClose();
    }
  }, [statusSelected, open]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
          <Button onClick={handleClose} color="secondary">
            {cancelText}
          </Button>

          <Button onClick={handleOpenConfirm} color="error" disabled={!rejectReason || rejectReason == ''}>
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        title={confirmTitle}
        message={confirmMessage}
        confirmText={statusSelected == 'REJECTED' ? 'Refuser' : 'Confirmer'}
        cancelText="Annuler"
        handleClose={handleCloseConfirm}
        open={openConfirm}
        handleDelete={handleConfirmReject}
      />
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
