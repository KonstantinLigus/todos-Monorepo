import React, { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ISwitch } from '../../types/student.types';

export const SwitchComponent: FC<ISwitch> = ({ name, isChecked, onChange }) => (
  <FormControl component="fieldset" variant="standard">
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={isChecked} onChange={onChange} name={name} />}
        label={name}
        labelPlacement="start"
      />
    </FormGroup>
  </FormControl>
);
