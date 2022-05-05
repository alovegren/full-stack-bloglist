import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter as Router } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const root = createRoot(document.getElementById('root'));

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#fcba03',
      darker: '#d69200',
      contrastText: '#fff',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const renderApp = () => {
  root.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

renderApp();
store.subscribe(renderApp);