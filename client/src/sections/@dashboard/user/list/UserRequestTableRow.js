import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, Box, Button } from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import RequestDetailsModal from './RequestDetailsModal';
import ConfirmationModal from 'src/components/dialog/ConfirmationModal';

// ----------------------------------------------------------------------

UserRequestTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserRequestTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  const { user, avatarUrl, mission, desciption, location, status } = row;
  const { nomemp, premp, email, matemp, foncemp, password, type } = user;

  const [openMenu, setOpenMenuActions] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openConfirmChangeState, setOpenConfirmChangeState] = useState(false);

  const handleOpenDetail = () => setOpenDetail(true);

  const handleCloseDetail = () => setOpenDetail(false);

  const handleOpenMenu = (event) => setOpenMenuActions(event.currentTarget);

  const handleCloseMenu = () => setOpenMenuActions(null);

  const handleOpenDelete = () => {
    setOpenDelete(true);
    handleCloseMenu();
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    handleCloseMenu();
  };

  const handleOpenConfirmChangeState = () => {
    setOpenConfirmChangeState(true);
    handleCloseMenu();
  };

  /**
   * Returns the corresponding French translation for a given status.
   *
   * @param {string} status - The status to translate.
   * @return {string} The French translation of the status.
   */
  function getStatus(status) {
    switch (status) {
      case 'ACTIVE':
        return 'Actif';
      case 'INACTIVE':
        return 'Inactif';
      case 'DELETED':
        return 'Supprimé';
      case 'REJECTED':
        return 'Rejeté';
      case 'PENDING':
        return 'En attente';
      case 'BLOCKED':
        return 'Bloqué';
      default:
        return 'Statut inconnu';
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'warning';
      case 'DELETED':
        return 'error';
      case 'REJECTED':
        return 'error';
      case 'PENDING':
        return 'warning';
      case 'BLOCKED':
        return 'error';
      default:
        return 'error';
    }
  }

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={nomemp} src={avatarUrl} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {nomemp} {premp}
        </Typography>
      </TableCell>

      <TableCell align="left">{matemp}</TableCell>

      {/* <TableCell align="left">{desciption}</TableCell> */}

      <TableCell align="left" sx={{ textJustify: 'justify' }}>
        {mission}
      </TableCell>

      <TableCell align="center" sx={{ textAlign: 'justify' }}>
        {location && <Box>Lieu de mission : {location}</Box>}
        <hr />
        {desciption && desciption.slice(0, 30) + '...'}
      </TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={getStatusColor(status)}
          sx={{ textTransform: 'capitalize' }}
        >
          {getStatus(status)}
        </Label>
      </TableCell>

      <TableCell align="right">
        <Button variant="outlined" color="secondary" onClick={handleOpenDetail} sx={{ mr: 1 }}>
          <Iconify icon={'eva:eye-fill'} />
        </Button>

        <Button variant="outlined" color="primary" onClick={handleOpenDetail}>
          <Iconify icon={'eva:check-fill'} /> Valider
        </Button>

        <RequestDetailsModal
          request={row}
          open={openDetail}
          handleClose={handleCloseDetail}
          handleOpen={handleOpenDetail}
        />

        {/* CONFIRM CHANGE TYPE */}
        <ConfirmationModal
          title="Confirmation l'activation du"
          message="Êtes-vous sûr de vouloir supprimer cette demande ?"
          confirmText="Valider"
          cancelText="Annuler"
          handleDelete={() => {
            // onDeleteRow();
            handleOpenConfirmChangeState();
          }}
          handleClose={handleCloseDelete}
          open={openConfirmChangeState}
        />

        {/* DELETE */}
        <ConfirmationModal
          title="Confirmation de suppression"
          message="Êtes-vous sûr de vouloir supprimer cette demande ?"
          confirmText="Supprimer"
          cancelText="Annuler"
          handleDelete={() => {
            onDeleteRow();
            handleCloseDelete();
          }}
          handleClose={handleCloseDelete}
          open={openDelete}
        />

        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Modifier
              </MenuItem>

              {user && row && (user?.isAdmin || row?.updated_by === user?.id) && (
                <MenuItem onClick={handleOpenDelete} sx={{ color: 'error.main' }}>
                  <Iconify icon={'eva:trash-2-outline'} />
                  Supprimer
                </MenuItem>
              )}
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
