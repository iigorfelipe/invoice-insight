import { createTheme } from '@mui/material';

const LightTheme = createTheme({

  breakpoints: {
    values: {
      xs: 360,
      sm: 680,
      md: 1100,
      lg: 1600,
      xl: 1900,
    }
  },

  palette: {
    mode: 'light',

    primary: {
      main: '#4078c0'
    },

    background: {
      default: '#fafafa',
      paper: '#f5f5f5',
    },

    error: {
      main: '#bd2c00',
    }
  },

  typography: {
    fontFamily: 'Inter',
    fontSize: 13
  },

  shape: {
    borderRadius: 8
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          background: '#E4E4E4',
          color: '#161616',
          height: '32px',
          padding: '5px 16px',
          borderRadius: '5px',
          border: '1px solid #CACACA',
          '&:hover': {
            background: '#EDEDED',
            color: '#161616',
            border: '1px solid #b5b5b5'
          }
        },
      },
    },
  },

});

export default LightTheme;