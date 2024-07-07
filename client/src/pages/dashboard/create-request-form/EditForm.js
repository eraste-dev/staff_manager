import React, { useEffect } from 'react';
// @mui
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Grid,
  Alert,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import AbsenceRequests from './AbsenceRequests';
import PropTypes from 'prop-types';
import { Stack } from 'immutable';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { RHFTextField } from 'src/components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ACTION_UPDATE, ACTION_USERS_UPDATE, MISSION_REQUEST_KEY } from './ids.constant';
import {
  fetchAllUsers,
  getUserRequests,
  initUserRequest,
  register,
  saveUserRequest,
  updateAccount,
  updateUser,
} from 'src/redux/slices/user';
import { STATE_ARRAY } from 'src/sections/@dashboard/user/list/StatusDropdown';
import { getStatus } from 'src/utils/utils.util';

function EditForm({ open, handleClose, user }) {
  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();
  const { users } = useSelector((state) => state.user);

  const FormSchema = Yup.object().shape({
    nomemp: Yup.string(),
    premp: Yup.string(),
    matemp: Yup.string(),
    foncemp: Yup.string(),
    email: Yup.string().email('Email must be a valid email address'),
    // password: Yup.string().required('Password is required'),
  });

  const defaultValues = { nomemp: '', premp: '', matemp: '', foncemp: '', email: '', password: '' };

  const methods = useForm({ resolver: yupResolver(FormSchema), defaultValues });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = methods;

  /**
   * Submits the form data asynchronously.
   *
   * @param {Object} data - The form data to be submitted.
   * @return {Promise<void>} A promise that resolves when the submission is complete.
   */
  const onSubmit = async (data) => {
    try {
      dispatch(updateUser({ ...data, id: user.id }));
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  // * On success of request
  useEffect(() => {
    // console.log(users && !users.isLoading && users.actionType === ACTION_USERS_UPDATE);
    if (users && !users.isLoading && users.actionType === ACTION_USERS_UPDATE && isSubmitted) {
      if (users.success) {
        enqueueSnackbar('Utilisateur modifié avec succès', { variant: 'success' });
        dispatch(fetchAllUsers());
        handleClose();
      }
    }
  }, [users, enqueueSnackbar, dispatch, handleClose]);

  // ! on error in request
  useEffect(() => {
    if (users && !users.isLoading && users.actionType === ACTION_USERS_UPDATE && isSubmitted) {
      if (users.error) {
        enqueueSnackbar(users.error, { variant: 'error' });
      }
    }
  }, [users, enqueueSnackbar]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog maxWidth="md" fullWidth={true} open={open} onClose={handleClose}>
          <DialogTitle> Modifier utilisateur </DialogTitle>

          {!isValid && console.log(errors)}

          <DialogContent>
            <DialogContentText>
              {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
              {users && users.error && (
                <Alert severity="error" sx={{ mt: 2, mb: 1 }}>
                  {users.error}
                </Alert>
              )}
            </DialogContentText>

            <Grid container spacing={3} mt={3}>
              <Grid item xs={12} md={6} lg={6}>
                <RHFTextField name="premp" label="Prenoms" defaultValue={user?.premp} />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <RHFTextField name="nomemp" label="Nom" defaultValue={user?.nomemp} />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <RHFTextField name="foncemp" label="Fonction" defaultValue={user?.foncemp} />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <RHFTextField name="matemp" label="Matricule" disabled defaultValue={user?.matemp} />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <RHFTextField name="email" label="Email" disabled defaultValue={user?.email} />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <InputLabel id="status-label">Statut</InputLabel>
                <Select
                  fullWidth
                  labelId="status-label"
                  id="status-dropdown"
                  value={user?.status}
                  // onChange={handleStatusChange}
                >
                  {STATE_ARRAY.map((state) => (
                    <MenuItem key={state} value={state}>
                      {getStatus(state)}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                reset();
              }}
              color="inherit"
            >
              Annuler
            </Button>

            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || !isValid}
              variant="contained"
            >
              Modifier
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </FormProvider>
  );
}

EditForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  requestData: PropTypes.object,
};

export default EditForm;
