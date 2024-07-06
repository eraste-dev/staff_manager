import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name, ...other }) {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (other.defaultValue && other.defaultValue) {
      console.log(other.defaultValue);
      setValue(name, other.defaultValue);
    }
  }, [name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
      )}
    />
  );
}
