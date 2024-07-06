import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, Box, Button, Grid, Divider } from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import RequestDetailsModal from './RequestDetailsModal';
import ConfirmationModal from 'src/components/dialog/ConfirmationModal';
import { getStatus, getStatusColor } from 'src/utils/utils.util';
import StatusDropdown from './StatusDropdown';
import { useDispatch } from 'react-redux';
import EditUserRequestModal from 'src/components/dialog/EditUserRequestModal';
import { BookingIllustration } from 'src/assets';
import RequestFormBase from 'src/pages/dashboard/create-request-form/RequestFormBase';
import { MISSION_REQUEST_KEY } from 'src/pages/dashboard/create-request-form/ids.constant';

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
  const dispatch = useDispatch();

  const { user, avatarUrl, mission, desciption, location, status } = row;
  const { nomemp, premp, email, matemp, foncemp, password, type } = user;

  const [openMenu, setOpenMenuActions] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editState, setEditState] = useState(false);

  const [requestData, setRequestData] = useState({
    title: "Demande d'absences",
    total: "Demande d'absence",
    icon: <BookingIllustration />,
  });
  // const [openConfirmChangeState, setOpenConfirmChangeState] = useState(false);

  const handleOpenDetail = () => setOpenDetail(true);

  const handleCloseDetail = () => setOpenDetail(false);

  const handleOpenMenu = (event) => setOpenMenuActions(event.currentTarget);

  const handleCloseMenu = () => setOpenMenuActions(null);

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
    if (row && row.request_type) {
      setRequestData({ ...requestData, id: row.request_type, data: row });
      setOpenEdit(true);
      // onEditRow
      handleCloseMenu();
    }
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

      <TableCell align="left" sx={{ textJustify: 'justify' }}>
        {mission && 'Mission : ' + mission}
      </TableCell>

      <TableCell align="center" sx={{ textAlign: 'justify' }}>
        {location && <Box>Lieu de mission : {location}</Box>}
        <Divider />
        {desciption.length > 300 ? desciption.slice(0, 300) + '...' : desciption}
      </TableCell>

      <TableCell align="left">
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item lg={12} sx={{ mb: 3 }}>
            {!editState && (
              <>
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={getStatusColor(status)}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {getStatus(status)}
                </Label>

                <Button onClick={() => setEditState(true)}>
                  <Iconify icon={'eva:edit-fill'} />
                </Button>
              </>
            )}
          </Grid>
          <Grid item lg={12} sx={{ mb: 3 }}>
            {editState && <StatusDropdown handleClose={() => setEditState(false)} current={row} />}
          </Grid>
        </Grid>
      </TableCell>

      <TableCell align="right">
        <Button variant="outlined" color="secondary" onClick={handleOpenDetail} sx={{ mr: 1 }}>
          <Iconify icon={'eva:eye-fill'} />
        </Button>

        <RequestDetailsModal
          request={row}
          open={openDetail}
          handleClose={handleCloseDetail}
          handleOpen={handleOpenDetail}
        />

        {/* UPDATE */}
        <RequestFormBase open={openEdit} handleClose={handleCloseEdit} requestData={requestData} />

        {/* DELETE */}
        <ConfirmationModal
          title="Confirmation de suppression"
          message="Êtes-vous sûr de vouloir supprimer cette demande ?"
          confirmText="Supprimer"
          cancelText="Annuler"
          handleClose={handleCloseDelete}
          open={openDelete}
          handleDelete={() => {
            onDeleteRow();
            handleCloseDelete();
          }}
        />

        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem onClick={handleOpenEdit}>
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
