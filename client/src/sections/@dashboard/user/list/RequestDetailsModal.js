import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { getStatus, getStatusColor, getUserRequestName } from 'src/utils/utils.util';
import Label from 'src/components/Label';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';

const RequestDetailsModal = ({ request, open, handleClose, handleOpen, handleOpenEdit }) => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Détails de la demande</DialogTitle>

        <DialogContent>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mt={3}>
            {request.request_type && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Type de demande :
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1 }}>
                  {getUserRequestName(request.request_type)}
                </Typography>
              </>
            )}

            <Typography variant="subtitle1" gutterBottom>
              ID de la demande :
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1 }}>
              {request.id}
            </Typography>

            {request.object && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Motif :
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1 }}>
                  {request.object}
                </Typography>
              </>
            )}

            {request.motif && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Motif :
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1, textAlign: 'justify' }}
                >
                  {request.motif}
                </Typography>
              </>
            )}

            {request.mission && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Mission :
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1 }}>
                  {request.mission}
                </Typography>
              </>
            )}

            {request.location && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Lieu :
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1 }}>
                  {request.location}
                </Typography>
              </>
            )}

            {request.description && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Description :
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1 }}>
                  {request.description || 'Aucune description spécifiée'}
                </Typography>
              </>
            )}

            {request.object && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Objet :
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1 }}>
                  {request.object || 'Aucun objet spécifié'}
                </Typography>
              </>
            )}

            {request.status && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Statut :
                </Typography>

                <Box sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1 }}>
                  <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={getStatusColor(request.status)}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    <span
                      onClick={() => {
                        // setEditState(true);
                      }}
                    >
                      {getStatus(request.status)}
                    </span>
                  </Label>
                </Box>
              </>
            )}

            {request.startDateFormatted && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Date de début :
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1 }}>
                  {request.startDateFormatted}
                </Typography>
              </>
            )}

            {request.endDateFormatted && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Date de fin :
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1 }}>
                  {request.endDateFormatted}
                </Typography>
              </>
            )}

            {request.reject_reason && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Motif de refus :
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: 'red.200', p: 1 }}>
                  {request.reject_reason || 'Aucun motif de refus'}
                </Typography>
              </>
            )}

            <Typography variant="subtitle1" gutterBottom>
              Employé :
            </Typography>
            <Box display="flex" alignItems="center">
              {request.user.avatar && (
                <img
                  src={request.user.avatar}
                  alt="Avatar"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '8px' }}
                />
              )}
              <Typography variant="body1">
                {request.user.nomemp} {request.user.premp} ({request.user.matemp})
              </Typography>
            </Box>

            <Typography variant="subtitle1" gutterBottom>
              Dernière mise à jour :
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1 }}>
              {request.updated_at}
            </Typography>

            {request.created_at && false && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Créé le :
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: 'grey.200', p: 1 }}>
                  {request.created_at}
                </Typography>
              </>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Fermer
          </Button>

          {false && user && !user.isAdmin && handleOpenEdit && request.status != 'ACTIVE' && (
            <Button variant="outlined" onClick={handleOpenEdit}>
              Modifier
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

RequestDetailsModal.propTypes = {
  request: PropTypes.object.isRequired,
};

export default RequestDetailsModal;
