import React, { useEffect } from 'react';
import { Box, FormGroup, TextField } from '@mui/material';
import { SwitchComponent } from '../Switch';
import { useGetFilter, useGetFilteredTodos } from '../../hooks';
import * as theme from '../../../theme';
import { ButtonComponent } from '../Button';
import { APP_KEYS } from '../../consts';

export const Filter = () => {
  const { data, isLoading, isSuccess, isError } = useGetFilter();
  const { mutate } = useGetFilteredTodos();

  const onTitleChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    mutate(`title=${event.target.value}`);
  };

  const onComplitedClickHandle = (isChecked: boolean) => {
    mutate(`isComplete=${isChecked}`);
  };
  const onPrivateClickHandle = (isChecked: boolean) => {
    mutate(`isPrivate=${isChecked}`);
  };

  const onShowAllClickHandler = () => {
    mutate(`perPage=${APP_KEYS.BACKEND_KEYS.PER_PAGE}&page=1`);
  };

  useEffect(() => {
    if (isSuccess) {
      const { isComplete, isPrivate, title } = data.filterFromDB;
      mutate(`title=${title}&isComplete=${isComplete}&isPrivate=${isPrivate}`);
    }
  }, [isSuccess]);

  if (isLoading) <div>Loading...</div>;
  if (isError) <div>An error has occurred </div>;
  if (isSuccess) {
    const { isComplete, isPrivate, title } = data.filterFromDB;
    return (
      <FormGroup sx={{ mb: theme.SPACES.m, mx: 'auto', maxWidth: '1100px' }}>
        <TextField
          value={title}
          onChange={onTitleChangeHandle}
          label="Title"
          variant="outlined"
          size="small"
        />
        <Box
          sx={{
            mt: theme.SPACES.s,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            maxWidth: '400px'
          }}
        >
          <SwitchComponent
            nameForLabel="Completed"
            callback={onComplitedClickHandle}
            isChecked={isComplete}
            ml="0"
          />
          <SwitchComponent
            nameForLabel="Private"
            callback={onPrivateClickHandle}
            isChecked={isPrivate}
            ml="0"
          />
          <ButtonComponent title="show all" onClick={onShowAllClickHandler} type="button" />
        </Box>
      </FormGroup>
    );
  }
};
