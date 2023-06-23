import React, { FC } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ISwitch } from '../../types/student.types';

export const SwitchComponent: FC<ISwitch> = ({ nameForLabel, isChecked, isLabel, onChange }) => (
  <>
    {isLabel && (
      <FormControlLabel
        control={<Switch checked={isChecked} onChange={onChange} name={nameForLabel} />}
        label={nameForLabel}
        labelPlacement="start"
      />
    )}
    {!isLabel && <Switch checked={isChecked} onChange={onChange} />}
  </>
);
