import { createTheme, alpha } from '@mui/material/styles';

const primaryMainColor = '#0B44CD'; 
const primaryLightColor = '#3470FF'; 
const textColorPrimary = '#121417';
const textColorSecondary = alpha(textColorPrimary, 0.5);

const theme = createTheme({
  palette: {
    primary: {
      main: primaryMainColor,
      light: primaryLightColor, 
    },
    text: {
      primary: textColorPrimary,
      secondary: textColorSecondary,
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF', 
    },
    divider: alpha(textColorPrimary, 0.1), 
  },
  typography: {
    fontFamily: ['Manrope', 'Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    fontSize: 16,
    h1: {
      fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      color: textColorPrimary,
    },
    h2: {
      fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.33,
      color: textColorPrimary,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,    
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
          color: textColorPrimary,
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
        ul: { listStyle: 'none', padding: 0, margin: 0 },
        a: { textDecoration: 'none', color: 'inherit' },
      },
    },
    MuiTypography: {
      defaultProps: { color: 'text.primary' },
      variants: [{
        props: { variant: 'navLink' },
        style: ({ theme: t }) => ({
          fontSize: '16px', fontWeight: 500, lineHeight: 1.5,
          color: t.palette.text.primary, paddingTop: '23px', paddingBottom: '23px',
          textDecoration: 'none', transition: 'color 0.2s ease-in-out, border-color 0.2s ease-in-out',
          borderBottom: '2px solid transparent',
          '&:hover': { color: t.palette.primary.light },
          '&.active': { color: t.palette.primary.light },
        }),
      }],
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' }, 
      styleOverrides: {
        root: ({ theme: t }) => ({
          width: '100%', paddingLeft: '15px', paddingRight: '15px',
          marginLeft: 'auto', marginRight: 'auto',
          [t.breakpoints.up('sm')]: { paddingLeft: '20px', paddingRight: '20px' },
          [t.breakpoints.up('md')]: { paddingLeft: '32px', paddingRight: '32px' },
          [t.breakpoints.up('lg')]: { maxWidth: '1184px' } 
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: '12px', textTransform: 'none', fontWeight: 600,
                lineHeight: 1.428, padding: '12px 24px',
                transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
                boxShadow: 'none',
        },
      },
      variants: [{
        props: { variant: 'appButton' },
        style: ({theme: t}) => ({
          minWidth: '168px', height: '44px', padding: '12px 50px',
          color: t.palette.common.white, backgroundColor: t.palette.primary.light,
          '&:hover, &:focus': { backgroundColor: t.palette.primary.main },
        }),
      }],
    },
    MuiSelect: {  },
    MuiMenuItem: { },
    MuiInputLabel: {  },
    MuiOutlinedInput: { },
    MuiFilledInput: {  },
    MuiChip: {  },
  },
});

export default theme;