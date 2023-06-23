import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import * as theme from '../theme';
import * as Styled from './app.styled';
import '../../style.css';
import { MainRouter } from '../navigation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Infinity
    }
  }
});

const AppContainer = () => (
  <SCThemeProvider theme={theme}>
    <Styled.GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <MainRouter />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </SCThemeProvider>
);

export default AppContainer;
