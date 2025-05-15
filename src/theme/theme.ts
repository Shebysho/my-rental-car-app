import { createTheme, alpha } from '@mui/material/styles';

const primaryMainColor = '#0B44CD'; 
const primaryLightColor = '#3470FF'; 
const textColorPrimary = '#121417';
const textColorSecondary = alpha(textColorPrimary, 0.5);

const theme = createTheme({
  palette: {
    primary: { main: primaryMainColor, light: primaryLightColor },
    text: { primary: textColorPrimary, secondary: textColorSecondary },
    background: { default: '#FFFFFF', paper: '#FFFFFF' },
    divider: alpha(textColorPrimary, 0.1), 
  },
  typography: {
    fontFamily: ['Manrope', 'Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    fontSize: 16,
    h1: { fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.2, color: textColorPrimary },
    h2: { fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 600, lineHeight: 1.33, color: textColorPrimary },
    navLink: { 
      fontSize: '16px', fontWeight: 500, lineHeight: 1.5,
      textDecoration: 'none', transition: 'color 0.2s ease-in-out',
      borderBottom: '2px solid transparent',
    }
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: '100%', scrollBehavior: 'smooth' },
        body: { backgroundColor: '#FFFFFF', color: textColorPrimary, lineHeight: '1.5', minHeight: '100%', display: 'flex', flexDirection: 'column' },
        '#root': { flexGrow: 1, display: 'flex', flexDirection: 'column' },
        main: { flexGrow: 1 },
        ul: { listStyle: 'none', padding: 0, margin: 0 },
        a: { textDecoration: 'none', color: 'inherit' },
      },
    },
    MuiTypography: {
      defaultProps: { color: 'text.primary' },
      variants: [{
        props: { variant: 'navLink' },
        style: ({ theme: t }) => ({
          color: t.palette.text.primary, 
          paddingTop: '23px', paddingBottom: '23px',
          '&:hover': { color: t.palette.primary.light },
          '&.active': { color: t.palette.primary.light },
        }),
      }],
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
      styleOverrides: {
        root: ({ theme: t }) => ({
          width: '100%', paddingLeft: t.spacing(2), paddingRight: t.spacing(2),
          marginLeft: 'auto', marginRight: 'auto',
          [t.breakpoints.up('sm')]: { paddingLeft: t.spacing(3), paddingRight: t.spacing(3) },
          [t.breakpoints.up('md')]: { paddingLeft: t.spacing(4), paddingRight: t.spacing(4) },
          [t.breakpoints.up('lg')]: { maxWidth: '1184px' }
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: '12px', textTransform: 'none', fontWeight: 600,
                lineHeight: 1.428, padding: '12px 24px',
                transition: 'background-color 0.3s ease', boxShadow: 'none',
        },
      },
      variants: [{
        props: { variant: 'appButton' },
        style: ({theme: t}) => ({
          color: t.palette.common.white, backgroundColor: t.palette.primary.light,
          '&:hover, &:focus': { backgroundColor: t.palette.primary.main },
        }),
      }],
    },
    MuiSelect: { /* Ваші узгоджені стилі */ },
    MuiMenuItem: { /* Ваші узгоджені стилі */ },
    MuiInputLabel: { /* Ваші узгоджені стилі */ },
    MuiOutlinedInput: { /* Ваші узгоджені стилі */ },
    MuiFilledInput: { /* Ваші узгоджені стилі */ },
    MuiChip: { /* Ваші узгоджені стилі */ },
  },
});

export default theme;