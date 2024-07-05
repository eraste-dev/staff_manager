import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fData } from '../../../../utils/formatNumber';
// _mock
import { countries } from '../../../../_mock';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from 'src/redux/slices/user';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { user, error, isLoading, updateSuccess } = useSelector((state) => state.user);

  const UpdateUserSchema = Yup.object().shape({
    nomemp: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    nomemp: user?.nomemp || '',
    premp: user?.premp || '',
    email: user?.email || '',
    matemp: user?.matemp || '',
    photoURL: user?.avatar || '',
    foncemp: user?.foncemp || '',
    state: user?.status || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(updateAccount({ ...data, id: user.id }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (!isLoading && updateSuccess) {
      enqueueSnackbar('Inscription reussie');
    }

    if (!isLoading && !updateSuccess && error) {
      enqueueSnackbar(`${error}`, { variant: 'error' });
    }
  }, [user, updateSuccess, isLoading, error, enqueueSnackbar]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            {false && <RHFSwitch name="isPublic" labelPlacement="start" label="Public Profile" sx={{ mt: 5 }} />}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="premp" label="Prenoms" />
              <RHFTextField name="nomemp" label="Nom" />

              <RHFTextField name="matemp" label="Matricule" disabled={true} />
              <RHFTextField name="foncemp" label="Fonction" />

              <RHFTextField name="email" label="Email" />

              {false && (
                <RHFSelect name="country" label="Country" placeholder="Country">
                  <option value="" />
                  {countries.map((option) => (
                    <option key={option.code} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </RHFSelect>
              )}

              {/* <RHFTextField  label="Email" /> */}
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              {/* <RHFTextField name="about" multiline rows={4} label="About" /> */}

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Mettre à jour
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
