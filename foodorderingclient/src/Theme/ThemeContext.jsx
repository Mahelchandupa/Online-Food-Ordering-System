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
                primary: { main: '#DDE6ED', icon: "#EFFFFD" },
                secondary: { main: '#9DB2BF' },
                background: { default: '#27374D', paper: '#eee', nav: '#526D82', gray: "#ebf0ec" },
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
