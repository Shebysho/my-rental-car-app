import { createTheme, alpha } from '@mui/material/styles';

const primaryMain = '#0B44CD'; 
const primaryLight = '#3470FF'; 
const textPrimary = '#121417';
const textSecondary = alpha(textPrimary, 0.5);

const theme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
      light: primaryLight, 
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF', 
    },
    divider: alpha(textPrimary, 0.2), 
  },
  typography: {
    fontFamily: ['Manrope', 'Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    fontSize: 16,
    h1: {
      fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      color: textPrimary,
    },
    h2: {
      fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.33,
      color: textPrimary,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320, 
      md: 768, 
      lg: 1440, 
      xl: 1920,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: '#FFFFFF', 
          color: textPrimary,
          lineHeight: '1.5',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        '#root': {
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        main: {
          flexGrow: 1,
        },
        ul: {
          listStyle: 'none',
          padding: 0,
          margin: 0,
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'navLink' },
          style: ({ theme: t }) => ({
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: t.palette.text.primary,
            paddingTop: '23px', 
            paddingBottom: '23px',
            textDecoration: 'none',
            transition: 'color 0.2s ease-in-out',
            borderBottom: '2px solid transparent',
            '&:hover': {
              color: t.palette.primary.light,
            },
            '&.active': {
              color: t.palette.primary.light,

            },
          }),
        },
      ],
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          width: '100%',
          paddingLeft: '15px',
          paddingRight: '15px',
          marginLeft: 'auto',
          marginRight: 'auto',
          [t.breakpoints.up('sm')]: { 
             maxWidth: '100%', 
          },
          [t.breakpoints.up('md')]: { 
             maxWidth: '768px',
          },
          [t.breakpoints.up('lg')]: { 
            maxWidth: '1214px', 
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          lineHeight: 1.25,
          padding: '12px 24px',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
        },
      },
      variants: [
        {
          props: { variant: 'appButton' },
          style: {
            border: 'none',
            minWidth: '168px',
            height: '44px',
            padding: '12px 50px',
            color: '#FFFFFF',
            backgroundColor: primaryLight,
            '&:hover, &:focus': {
              backgroundColor: primaryMain,
            },
          },
        },
      ],
    },
  },
});

export default theme;