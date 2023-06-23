import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export const SwitchesGroup = () => {
  const [state, setState] = React.useState({
    isComplete: true,
    isPrivate: false
  });

  const isCompleteCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  const isPrivateCheckHandker = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.isComplete}
              onChange={isCompleteCheckHandler}
              name="isComplete"
            />
          }
          label="Complete"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Switch checked={state.isPrivate} onChange={isPrivateCheckHandker} name="isPrivate" />
          }
          label="Private"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  );
};
