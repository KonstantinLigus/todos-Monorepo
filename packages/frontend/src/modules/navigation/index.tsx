import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import HomePageContainer from '../home';
import TodoPage from '../todo';
import TodosPage from '../todos';

export const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<HomePageContainer />} path={APP_KEYS.ROUTER_KEYS.ROOT} />
      <Route element={<TodoPage />} path={APP_KEYS.ROUTER_KEYS.TODO} />
      <Route element={<TodosPage />} path={APP_KEYS.ROUTER_KEYS.TODOS} />
    </Routes>
  </BrowserRouter>
);
