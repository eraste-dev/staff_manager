import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, Button } from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import EditForm from 'src/pages/dashboard/create-request-form/EditForm';
import ConfirmationModal from 'src/components/dialog/ConfirmationModal';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  const { nomemp, premp, email, foncemp, matemp, avatar, company, role, isVerified, status, isAdmin, count_request } =
    row;

  const [openMenu, setOpenMenuActions] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [requestData, setRequestData] = useState({});

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  /**
   * Opens the delete modal and closes the menu.
   *
   * @return {void}
   */
  const handleOpenDelete = () => {
    setOpenDelete(true);
    handleCloseMenu();
  };

  /**
   * Closes the delete modal and handles closing the menu.
   *
   * @return {void}
   */
  const handleCloseDelete = () => {
    setOpenDelete(false);
    handleCloseMenu();
  };

  const handleOpenEdit = () => {
    setRequestData({ user: row });
    setOpenEdit(true);
    handleCloseMenu();
  };

  /**
   * Closes the edit modal and handles closing the menu.
   *
   * @return {void}
   */
  const handleCloseEdit = () => {
    setOpenEdit(false);
    handleCloseMenu();
  };

  return (
    <TableRow hover selected={selected}>
      {false && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      )}

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={nomemp} src={avatar} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {premp} {nomemp}
        </Typography>
      </TableCell>

      <TableCell align="left">{count_request}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {foncemp}
      </TableCell>

      <TableCell align="center">
        {isAdmin && (
          <Iconify
            icon={isAdmin ? 'eva:checkmark-circle-fill' : 'eva:close-fill'}
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
              ...(!isAdmin && { color: 'error.main' }),
            }}
          />
        )}
      </TableCell>

      <TableCell align="right">
        {/* UPDATE */}
        <EditForm open={openEdit} handleClose={handleCloseEdit} user={requestData && requestData?.user} />

        <ConfirmationModal
          title="Confirmation de suppression"
          message="Êtes-vous sûr de vouloir supprimer l'utilisateur ?"
          confirmText="Supprimer"
          cancelText="Annuler"
          handleClose={handleCloseDelete}
          open={openDelete}
          handleDelete={() => {
            onDeleteRow();
            handleCloseDelete();
          }}
        />

        {!isAdmin && (
          <Button variant="outlined" color="error" onClick={handleOpenDelete} sx={{ color: 'error.main' }}>
            <Iconify icon={'eva:trash-2-outline'} />
            Supprimer
          </Button>
        )}

        {false && (
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <MenuItem onClick={handleOpenDelete} sx={{ color: 'error.main' }}>
                  <Iconify icon={'eva:trash-2-outline'} />
                  Supprimer
                </MenuItem>

                {false && (
                  <MenuItem onClick={handleOpenEdit}>
                    <Iconify icon={'eva:edit-fill'} />
                    Modifier
                  </MenuItem>
                )}
              </>
            }
          />
        )}
      </TableCell>
    </TableRow>
  );
}
