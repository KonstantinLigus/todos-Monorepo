import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

export const SharedLayout = () => (
  <>
    <Header />
    <Suspense fallback={<p>Loading...</p>}>
      <Outlet />
    </Suspense>
  </>
);
