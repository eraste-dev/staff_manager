import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  inputFormat: PropTypes.string,
};

export default function RHFDatePicker({ name, inputFormat, ...other }) {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (other.defaultValue && other.defaultValue) {
      setValue(name, other.defaultValue);
    }
  }, [name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          value={new Date(field.value)}
          label={other && other.label && other.label}
          inputFormat={inputFormat}
          renderInput={(params) => (
            <TextField fullWidth {...field} {...other} {...params} error={!!error} helperText={error?.message} />
          )}
          onChange={(e) => setValue(name, new Date(e).getTime())}
        />
      )}
    />
  );
}
