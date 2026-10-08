import { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

// Familias: Amaranth es display (solo h1/h2), Signika es el cuerpo.
// Sin espacio inicial, y sin la familia fallback que nunca se cargaba.
const BODY_FONT = '"Signika", "Helvetica", "Arial", sans-serif';
const DISPLAY_FONT = '"Amaranth", "Signika", "Helvetica", "Arial", sans-serif';

// Escala estrictamente decreciente: 48 > 36 > 28 > 24 > 20 > 18 > 16.
// h5 (300) es más liviano que body1 (400), así el fondo de la jerarquía no queda plano.
const FONT_SIZES = {
  h1: '3rem',      // 48px
  h2: '2.25rem',   // 36px
  h3: '1.75rem',   // 28px
  h4: '1.5rem',    // 24px
  h5: '1.25rem',   // 20px
  h6: '1.125rem',  // 18px
};

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
              main: colors.deepOrange[400],
              // 4.79:1 sobre #ff7043. Era un blanco fijo (2.74:1) y fallaba AA.
              contrastText: colors.blueGrey[900],
            },
            // Borde del footer: naranja de marca. Antes caía al purple[500] de MUI.
            secondary: { main: colors.deepOrange[900] },
            background: { default: colors.deepOrange[200] },
            text: {
              primary: colors.blueGrey[900],
              // 5.04:1 sobre #ffccbc. Era blueGrey[600] (3.76:1) y fallaba AA.
              secondary: colors.blueGrey[700],
            }
          }
        : {
            // 🌙 COLORES MODO OSCURO (Corregidos para armonía visual)
            primary: {
              main: colors.deepOrange[300], // El naranja de tu marca pero m�s suave para la noche
              // Texto claro sobre naranja para mejor legibilidad en header/iconos
              contrastText: colors.grey[50],
            },
            // 6.07:1 sobre #1e1e1e (el footer oscuro usa background.paper, no primary.main).
            secondary: { main: colors.deepOrange[400] },
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
      fontFamily: BODY_FONT,
      fontSizes: FONT_SIZES,
      // Amaranth sirve solo 400 y 700: al fijar esos dos pesos el browser
      // nunca tiene que adivinar un nearest-match.
      h1: { fontFamily: DISPLAY_FONT, fontWeight: 700, lineHeight: 1.1 },
      h2: { fontFamily: DISPLAY_FONT, fontWeight: 400, lineHeight: 1.2 },
      h3: { fontWeight: 500, lineHeight: 1.25 },
      h4: { fontWeight: 400, lineHeight: 1.3 },
      h5: { fontWeight: 300, lineHeight: 1.35 },
      h6: { fontWeight: 600, lineHeight: 1.4 },
      body1: { fontWeight: 400, lineHeight: 1.6 },
      body2: { fontWeight: 400, lineHeight: 1.5 },
      // Una sola política de mayúsculas en todo el sitio (fin de las UPPERCASE).
      button: { textTransform: 'none', fontWeight: 600 },
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