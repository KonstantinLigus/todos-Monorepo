import React, { FC } from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import { ITodoList } from '../../types/student.types';
import { ButtonComponent } from '../Button';
import * as theme from '../../../theme';

export const TodoListTablet: FC<ITodoList> = ({
  todos,
  deleteBtnClickHandler,
  viewBtnClickHandler
}) => (
  <Swiper
    wrapperTag="ul"
    pagination={{
      type: 'fraction'
    }}
    modules={[Pagination]}
    className="mySwiper"
    style={{ left: 0, height: '65vh' }}
  >
    {todos.map((todo) => (
      <SwiperSlide key={todo.id} tag="li">
        <ListItem sx={{ flexDirection: 'column', alignItems: 'start' }} component="div">
          <ListItemText primary={todo.title} secondary={todo.description} sx={{ height: '45vh' }} />
          <span>
            <ButtonComponent
              title="View"
              mr={theme.SPACES.l}
              itemId={todo.id}
              onClick={viewBtnClickHandler}
              type="button"
            />
            <ButtonComponent
              title="Delete"
              itemId={todo.id}
              onClick={deleteBtnClickHandler}
              type="button"
            />
          </span>
        </ListItem>
      </SwiperSlide>
    ))}
  </Swiper>
);
