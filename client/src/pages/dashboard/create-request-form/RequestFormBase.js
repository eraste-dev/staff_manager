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
import { MISSION_REQUEST_KEY } from './ids.constant';
import { initUserRequest, saveUserRequest } from 'src/redux/slices/user';

function RequestFormBase({ open, handleClose, requestData }) {
  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, userRequest } = useSelector((state) => state.user);

  const FormSchema = Yup.object().shape({
    // basic fields
    nomemp: Yup.string().required('Le nom est obligatoire'),
    premp: Yup.string(),
    matemp: Yup.string().required('Le matricule est obligatoire'),
    foncemp: Yup.string(),
    email: Yup.string(), // .email('Email must be a valid email address').required('Email is required')

    // addons fields
    location: Yup.string(),
    desciption: Yup.string(),
    object: Yup.string(),
  });

  const defaultValues = {
    nomemp: user && user?.nomemp ? user?.nomemp : '',
    premp: user && user?.premp ? user?.premp : '',
    matemp: user && user?.matemp ? user?.matemp : '',
    foncemp: user && user?.foncemp ? user?.foncemp : '',
    email: user && user?.email ? user?.email : '',
  };

  const methods = useForm({ resolver: yupResolver(FormSchema), defaultValues });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  /**
   * Submits the form data asynchronously.
   *
   * @param {Object} data - The form data to be submitted.
   * @return {Promise<void>} A promise that resolves when the submission is complete.
   */
  const onSubmit = async (data) => {
    try {
      console.table(data);
      dispatch(saveUserRequest(formatData(data)));
      //   handleClose();
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  /**
   * Returns a new object with the properties of the input data object,
   * along with an additional property "id" set to the value of the user's id.
   *
   * @param {Object} data - The input data object.
   * @return {Object} The new object with the formatted data.
   */
  const formatData = (data) => {
    return {
      ...data,
      user_id: user?.id,
    };
  };

  const canShowFunction = () => {
    return requestData && requestData?.id != MISSION_REQUEST_KEY;
  };

  const canShowMatricule = () => {
    return requestData && requestData?.id != MISSION_REQUEST_KEY;
  };

  const canShowEmail = () => {
    return requestData && requestData?.id != MISSION_REQUEST_KEY;
  };

  const isMissionRequest = () => {
    return requestData && requestData?.id == MISSION_REQUEST_KEY;
  };

  // On success of request
  useEffect(() => {
    if (userRequest && !userRequest.isLoading) {
      if (userRequest.success) {
        enqueueSnackbar('Demande envoyée avec succès', { variant: 'success' });
        dispatch(initUserRequest());
        handleClose();
      }
    }
  }, [userRequest, enqueueSnackbar, dispatch, handleClose]);

  // on error in request
  useEffect(() => {
    if (userRequest && !userRequest.isLoading) {
      if (userRequest.error) {
        enqueueSnackbar(userRequest.error, { variant: 'error' });
      }
    }
  }, [userRequest, enqueueSnackbar]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog maxWidth="md" fullWidth={true} open={open} onClose={handleClose}>
          <DialogTitle> {requestData && requestData.title} </DialogTitle>

          <DialogContent>
            <DialogContentText>
              {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
              {userRequest && userRequest.error && (
                <Alert severity="error" sx={{ mt: 2, mb: 1 }}>
                  {userRequest.error}
                </Alert>
              )}
            </DialogContentText>

            <Grid container spacing={3} mt={3}>
              <Grid item xs={12} md={6} lg={6}>
                <RHFTextField name="premp" label="Prenoms" />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <RHFTextField name="nomemp" label="Nom" />
              </Grid>

              {canShowFunction() && (
                <Grid item xs={12} md={6} lg={6}>
                  <RHFTextField name="foncemp" label="Fonction" />
                </Grid>
              )}

              {canShowMatricule() && (
                <Grid item xs={12} md={6} lg={6}>
                  <RHFTextField name="matemp" label="Matricule" />
                </Grid>
              )}

              {canShowEmail() && (
                <Grid item xs={12} md={6} lg={6}>
                  <RHFTextField name="email" label="Email" />
                </Grid>
              )}

              {isMissionRequest() && (
                <>
                  <Grid item xs={12} md={6} lg={6}>
                    <RHFTextField name="location" label="Lieu de mission" />
                  </Grid>

                  <Grid item xs={12} md={6} lg={6}>
                    <RHFTextField name="desciption" label="But de la mission" />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <RHFTextField name="object" label="Interêt de la mission" />
                  </Grid>
                </>
              )}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Annuler
            </Button>

            <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained">
              Envoyer la demande
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </FormProvider>
  );
}

RequestFormBase.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  requestData: PropTypes.object,
};

export default RequestFormBase;
