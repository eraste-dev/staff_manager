import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getStatus } from 'src/utils/utils.util';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRequests, initUserRequest, saveUserRequest } from 'src/redux/slices/user';
import { useSnackbar } from 'notistack';
import { ACTION_UPDATE } from 'src/pages/dashboard/create-request-form/ids.constant';
import ConfirmRejectModal from 'src/components/dialog/ConfirmRejectModal';

// export const STATE_ARRAY = ['ACTIVE', 'INACTIVE', 'DELETED', 'REJECTED', 'PENDING', 'BLOCKED'];
export const STATE_ARRAY = ['ACTIVE', 'REJECTED', 'PENDING'];

const StatusDropdown = ({ current, handleClose }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [openDelete, setOpenDelete] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [status, setStatus] = useState(current.status || 'PENDING');
  const { user, userRequest } = useSelector((state) => state.user);

  /**
   * Opens the delete modal and closes the menu.
   *
   * @return {void}
   */
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    // handleCloseMenu();
  };

  const onChangeReject = (event) => {
    if (event.target.value) {
      setRejectReason(event.target.value);
    } else {
      console.log(event);
    }
  };

  /**
   * Updates the user request status asynchronously.
   *
   * @param {string} state - The new status state to update.
   * @return {Promise<void>} A promise that resolves after updating the user request status.
   */
  const updateUserRequest = async (state, rejectReason) => {
    const userRequest = current;
    try {
      if (userRequest && userRequest.id) {
        // userRequest.status = state;
        dispatch(saveUserRequest({ ...userRequest, status: state, reject_reason: rejectReason }));
      } else {
        console.error('userRequest is null');
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Updates the status based on the event target value and triggers the necessary updates.
   *
   * @param {Event} event - The event object containing the target value.
   * @return {void} No return value.
   */
  const handleStatusChange = (event) => {
    if (event && event.target && event.target.value) {
      const newStatus = event.target.value;
      setStatus(newStatus);
      handleOpenDelete();
      if (event.target.value === status) {
        // Your logic here...
      }
    } else {
      console.error('Invalid event or target value');
    }
  };

  useEffect(() => {
    console.log(status, 'status >>StatusDropdown ');
  }, [status]);

  // * ON_SUCCESS_OF_REQUEST
  useEffect(() => {
    if (userRequest && !userRequest.isLoading && userRequest.success && userRequest.actionType === ACTION_UPDATE) {
      enqueueSnackbar('Le status a été modifié', { variant: 'success' });
      dispatch(initUserRequest());

      // TODO : use useEffect to single fetchAll
      const payload = user && !user?.isAdmin && user?.id ? `?user_id=${user?.id}` : '';
      dispatch(getUserRequests(payload));
      handleClose();
    }
  }, [userRequest, enqueueSnackbar, dispatch, handleClose]);

  //! ON_ERROR_IN_REQUEST
  useEffect(() => {
    if (userRequest && !userRequest.isLoading && !userRequest.success && userRequest.actionType === ACTION_UPDATE) {
      if (userRequest.error) {
        enqueueSnackbar(userRequest.error, { variant: 'error' });
      }
    }
  }, [userRequest, enqueueSnackbar]);

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Box display={'flex'}>
        <InputLabel id="status-label">Statut</InputLabel>
        <Select fullWidth labelId="status-label" id="status-dropdown" value={status} onChange={handleStatusChange}>
          {user &&
            user?.isAdmin &&
            STATE_ARRAY.map((state) => (
              <MenuItem key={state} value={state}>
                {getStatus(state)}
              </MenuItem>
            ))}
        </Select>

        <Button color="error" onClick={handleClose}>
          <Iconify icon="eva:close-fill" />
        </Button>

        {/* ConfirmRejectModal */}
        <ConfirmRejectModal
          title="Confirmation de rejet de demande"
          message="Êtes-vous sûr de vouloir rejeter cette demande ?"
          confirmText="Rejeter"
          cancelText="Annuler"
          handleClose={handleCloseDelete}
          open={openDelete}
          onChangeReject={onChangeReject}
          statusSelected={status}
          rejectReason={rejectReason}
          handleDelete={() => {
            updateUserRequest(status, rejectReason).catch((error) => console.error(error));
            handleCloseDelete();
          }}
        />
      </Box>
    </FormControl>
  );
};

StatusDropdown.propTypes = {
  onChangeState: PropTypes.func,
  current: PropTypes.object,
};

export default StatusDropdown;
