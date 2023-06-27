import React, { FC } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ISwitch } from '../../types/student.types';

export const SwitchComponent: FC<ISwitch> = ({ nameForLabel, isChecked, isLabel, callback }) => {
  const [isSwitchChecked, setIsSwitchChecked] = React.useState(isChecked);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const res = callback(event.target.checked);
    setIsSwitchChecked(res);
  };

  return (
    <>
      {isLabel && (
        <FormControlLabel
          control={<Switch checked={isSwitchChecked} onChange={onChange} name={nameForLabel} />}
          label={nameForLabel}
          labelPlacement="start"
        />
      )}
      {!isLabel && <Switch checked={isChecked} onChange={onChange} />}
    </>
  );
};
