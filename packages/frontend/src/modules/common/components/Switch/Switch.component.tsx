import React, { FC } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ISwitch } from '../../types/student.types';

export const SwitchComponent: FC<ISwitch> = ({ nameForLabel, isChecked, callback, ml }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    callback(event.target.checked);
  };

  return (
    <>
      {nameForLabel && (
        <FormControlLabel
          control={<Switch checked={isChecked} onChange={onChange} name={nameForLabel} />}
          label={nameForLabel}
          labelPlacement="start"
          sx={{ ml }}
        />
      )}
      {!nameForLabel && <Switch checked={isChecked} onChange={onChange} />}
    </>
  );
};
