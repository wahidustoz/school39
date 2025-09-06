import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc', // Material Design 3 primary
      light: '#d7b4ff',
      dark: '#985eff',
      contrastText: '#000000',
    },
    secondary: {
      main: '#03dac6', // Material Design 3 secondary
      light: '#66fff9',
      dark: '#00a896',
      contrastText: '#000000',
    },
    background: {
      default: '#121212', // Material Design 3 dark surface
      paper: '#1e1e1e',
    },
    surface: {
      main: '#1e1e1e',
      variant: '#2d2d2d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    error: {
      main: '#cf6679',
      light: '#ff9aa2',
      dark: '#b00020',
    },
    warning: {
      main: '#ffb74d',
      light: '#ffcc02',
      dark: '#ff8f00',
    },
    info: {
      main: '#81c784',
      light: '#b2dfdb',
      dark: '#388e3c',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.3,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 24,
          padding: '12px 24px',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #bb86fc 0%, #985eff 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #d7b4ff 0%, #bb86fc 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: '#1e1e1e',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        elevation1: {
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        elevation2: {
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        outlined: {
          borderColor: 'rgba(187, 134, 252, 0.5)',
          color: '#bb86fc',
        },
      },
    },
  },
});

export default theme;
