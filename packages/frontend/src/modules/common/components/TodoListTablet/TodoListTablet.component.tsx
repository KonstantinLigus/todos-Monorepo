/* eslint-disable import/no-extraneous-dependencies */
import React, { FC } from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { ITodoList } from '../../types/student.types';
import { ButtonComponent } from '../Button';
import * as theme from '../../../theme';

export const TodoListTablet: FC<ITodoList> = ({
  todos,
  deleteBtnClickHandler,
  viewBtnClickHandler
}) => (
  <Swiper
    pagination={{
      dynamicBullets: true
    }}
    modules={[Pagination]}
    style={{ left: 0, height: '85vh' }}
  >
    {todos.map((todo) => (
      <SwiperSlide key={todo.id}>
        <ListItem disableGutters sx={{ flexDirection: 'column', alignItems: 'start' }}>
          <ListItemText primary={todo.title} secondary={todo.description} sx={{ height: '60vh' }} />
          <span>
            <ButtonComponent
              title="View"
              mr={theme.SPACES.l}
              itemId={todo.id}
              onClick={viewBtnClickHandler}
            />
            <ButtonComponent title="Delete" itemId={todo.id} onClick={deleteBtnClickHandler} />
          </span>
        </ListItem>
      </SwiperSlide>
    ))}
  </Swiper>
);
