import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './Theme/ThemeContext';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
