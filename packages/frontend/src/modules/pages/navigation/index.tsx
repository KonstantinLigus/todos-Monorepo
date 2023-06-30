import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { APP_KEYS } from '../../common/consts';
import TodoPage from '../todo';
import TodosPage from '../todos';
import CreateTodoPage from '../createTodo';
import { RegisterPage } from '../register';
import { SharedLayout } from '../../common/components/SharedLayout';
import { HomePage } from '../home';
import LogInPage from '../logIn';

export const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={APP_KEYS.ROUTER_KEYS.ROOT} element={<SharedLayout />}>
        <Route element={<HomePage />} index />
        <Route element={<RegisterPage />} path={APP_KEYS.ROUTER_KEYS.REGISTER} />
        <Route element={<LogInPage />} path={APP_KEYS.ROUTER_KEYS.LOGIN} />
        <Route element={<TodosPage />} path={APP_KEYS.ROUTER_KEYS.TODOS} />
        <Route element={<TodoPage />} path={APP_KEYS.ROUTER_KEYS.TODO_ID} />
        <Route element={<CreateTodoPage />} path={APP_KEYS.ROUTER_KEYS.TODO_CREATE} />
      </Route>
    </Routes>
  </BrowserRouter>
);
