import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import Iconify from 'src/components/Iconify';

const RequestDetailsModal = ({ request, open, handleClose, handleOpen }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Détails de la demande</DialogTitle>

        <DialogContent>
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Mission :
            </Typography>
            <Typography variant="body1">{request.mission}</Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Lieu :
            </Typography>
            <Typography variant="body1">{request.location}</Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Description :
            </Typography>
            <Typography variant="body1">{request.desciption}</Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Objet :
            </Typography>
            <Typography variant="body1">{request.object || 'Aucun objet spécifié'}</Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Utilisateur :
            </Typography>
            <Box display="flex" alignItems="center">
              <img
                src={request.user.avatar}
                alt="Avatar"
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '8px' }}
              />
              <Typography variant="body1">
                {request.user.nomemp} {request.user.premp} ({request.user.matemp})
              </Typography>
            </Box>
          </Box>

          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Mis à jour par :
            </Typography>
            <Typography variant="body1">
              {request.updated_by
                ? `${request.updated_by.nomemp} ${request.updated_by.premp} (${request.updated_by.matemp})`
                : 'Aucune mise à jour'}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Créé le :
            </Typography>
            <Typography variant="body1">{request.created_at}</Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Mis à jour le :
            </Typography>
            <Typography variant="body1">{request.updated_at}</Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

RequestDetailsModal.propTypes = {
  request: PropTypes.object.isRequired,
};

export default RequestDetailsModal;
