import React from 'react';
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

function RequestFormBase({ open, handleClose, requestData }) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const FormSchema = Yup.object().shape({
    nomemp: Yup.string().required('First name required'),
    premp: Yup.string().required('Last name required'),
    matemp: Yup.string().required('Last name required'),
    foncemp: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const defaultValues = {
    nomemp: '',
    premp: '',
    matemp: '',
    foncemp: '',
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      //   dispatch(register(data));
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <Dialog maxWidth="md" fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle> {requestData && requestData.title} </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <AbsenceRequests />
        </DialogContentText>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <RHFTextField name="premp" label="Prenoms" />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <RHFTextField name="nomemp" label="Nom" />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <RHFTextField name="foncemp" label="Fonction" />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <RHFTextField name="matemp" label="Matricule" />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <RHFTextField name="email" label="Email" />
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Annuler
        </Button>

        <Button onClick={handleClose} variant="contained">
          Envoyer la demande
        </Button>
      </DialogActions>
    </Dialog>
  );
}

RequestFormBase.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  requestData: PropTypes.object,
};

export default RequestFormBase;
