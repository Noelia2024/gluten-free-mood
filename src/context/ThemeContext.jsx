import { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light'); // Estado inicial: claro

  // Cambia entre 'light' y 'dark'
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // ☀️ COLORES MODO CLARO
            primary: { 
              main: colors.deepOrange[400] ,
              contrastText: 'ffffff'
            },
            background: { default: colors.deepOrange[200] },
            text: {
              primary: colors.blueGrey[900],
              secondary: colors.blueGrey[600],
            }
          }
        : {
            // 🌙 COLORES MODO OSCURO (Corregidos para armonía visual)
            primary: { main: colors.deepOrange[300] }, // El naranja de tu marca pero más suave para la noche
            background: { 
              default: '#121212', // Gris casi negro para el fondo de la web
              paper: '#1e1e1e',   // Gris un toque más claro para el Footer y Tarjetas
            },
            text: {
              primary: colors.grey[50],       // Letras blancas/claras obligatorias
              secondary: colors.blueGrey[200],
            }
          }),
    },

    typography: {
      fontFamily: ' "Signika", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        color: mode === 'light' ? colors.blueGrey[900] : colors.grey[50],
      },
      h2: {
        fontWeight: 600,
        color: mode === 'light' ? colors.blueGrey[900] : colors.grey[50],
      },
      h3: {
        fontWeight: 500,
        color: mode === 'light' ? colors.blueGrey[900] : colors.grey[50],
      },
      h4: {
        fontWeight: 400,
        color: mode === 'light' ? colors.blueGrey[900] : colors.grey[50],
      },
      h5: {
        fontWeight: 300,
        color: mode === 'light' ? colors.blueGrey[900] : colors.grey[50],
      },
      body1: {
        fontWeight: 300,
      },
    }
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);