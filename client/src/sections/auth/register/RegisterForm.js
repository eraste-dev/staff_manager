import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { register } from 'src/redux/slices/user';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, error, isLoading, registerSuccess } = useSelector((state) => state.user);

  const { enqueueSnackbar } = useSnackbar();
  // const isMountedRef = useIsMountedRef();

  const isMountedRef = useIsMountedRef();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    nomemp: Yup.string().required('First name required'),
    premp: Yup.string().required('Last name required'),
    matemp: Yup.string().required('Last name required'),
    foncemp: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = { nomemp: '', premp: '', matemp: '', foncemp: '', email: '', password: '' };

  const methods = useForm({ resolver: yupResolver(RegisterSchema), defaultValues });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(register(data));
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  useEffect(() => {
    if (!isLoading && registerSuccess) {
      enqueueSnackbar('Inscription reussie');
      router.replace(PATH_DASHBOARD.general.booking);
    }

    if (!isLoading && !registerSuccess) {
      enqueueSnackbar(`${error}`, { variant: 'error' });
    }
  }, [user, registerSuccess, isLoading, enqueueSnackbar]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="premp" label="Prenoms" />
          <RHFTextField name="nomemp" label="Nom" />
        </Stack>

        <RHFTextField name="foncemp" label="Fonction" />

        <RHFTextField name="matemp" label="Matricule" />

        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Inscription
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
