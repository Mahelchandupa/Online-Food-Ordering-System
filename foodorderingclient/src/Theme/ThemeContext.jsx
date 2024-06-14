import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              primary: { main: '#ff9800', icon: '#757575' },
              secondary: { main: '#ff5722' },
              background: { default: '#f5f5f5', paper: '#fff', nav: '#fff', gray: "#2f302f" },
            }
            : {
              primary: { main: '#ff9800', icon: "#ffcc80" }, // Vibrant orange for primary elements
              secondary: { main: '#ff5722' }, // Bright red-orange for secondary elements
              background: { default: '#2d2d2d', paper: '#424242', nav: '#333', gray: "#e0e0e0" }, // Darker background with slight variations for nav and paper
              text: { primary: '#ffffff', secondary: '#e0e0e0' }, // White text for better contrast
            }),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
