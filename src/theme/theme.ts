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
    divider: alpha(textPrimary, 0.1), 
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
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
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
      defaultProps: {
        color: 'text.primary',
      },
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
            transition: 'color 0.2s ease-in-out, border-color 0.2s ease-in-out',
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
      defaultProps: {
        maxWidth: 'lg', 
      },
      styleOverrides: {
        root: ({ theme: t }) => ({
          width: '100%',
          paddingLeft: '15px',
          paddingRight: '15px',
          marginLeft: 'auto',
          marginRight: 'auto',
          [t.breakpoints.up('sm')]: {
             paddingLeft: '20px',
             paddingRight: '20px',
          },
          [t.breakpoints.up('md')]: {
             paddingLeft: '32px',
             paddingRight: '32px',
          },
          [t.breakpoints.up('lg')]: { 
            maxWidth: '1184px', 
          }
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          lineHeight: 1.428,
          padding: '12px 24px',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
          boxShadow: 'none',
        },
      },
      variants: [
        {
          props: { variant: 'appButton' },
          style: ({theme: t}) => ({
            minWidth: '168px',
            height: '44px',
            padding: '12px 50px',
            color: t.palette.common.white,
            backgroundColor: t.palette.primary.light,
            '&:hover, &:focus': {
              backgroundColor: t.palette.primary.main,
            },
          }),
        },
      ],
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '14px',
          backgroundColor: '#F7F7FB',
          height: '48px',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(textPrimary, 0.2),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: primaryLight,
          },
        },
        icon: {
          color: textPrimary,
        },
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: 500,
          color: alpha(textPrimary, 0.5),
          '&:hover': {
            color: textPrimary,
            backgroundColor: alpha(primaryLight, 0.08),
          },
          '&.Mui-selected': {
            color: textPrimary,
            backgroundColor: alpha(primaryLight, 0.12),
            '&:hover': {
                backgroundColor: alpha(primaryLight, 0.15),
            }
          },
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 500,
          color: '#8A8A8F',
          position: 'static',
          transform: 'none',
          marginBottom: '8px',
          '&.Mui-focused': {
              color: '#8A8A8F',
          },
        }
      }
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                 backgroundColor: '#F7F7FB',
                 borderRadius: '12px',
                '& fieldset': {
                    borderColor: 'transparent',
                },
                '&:hover fieldset': {
                    borderColor: alpha(textPrimary, 0.2),
                },
                '&.Mui-focused fieldset': {
                    borderColor: primaryLight,
                    borderWidth: '1px',
                },
            },
            input: {
                height: '48px',
                padding: '0 18px',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: 1.11,
                color: textPrimary,
                '&::placeholder': {
                    color: textPrimary,
                    opacity: 1,
                }
            }
        }
    },
    MuiFilledInput: {
        styleOverrides: {
            root: {
                borderRadius: '12px',
                backgroundColor: '#F7F7FB',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                '&:before, &:after': {
                    borderBottom: 'none !important',
                },
                '&:hover': {
                    backgroundColor: alpha('#F7F7FB', 0.9),
                },
                '&.Mui-focused': {
                    backgroundColor: alpha('#F7F7FB', 0.8),
                }
            },
            input: {
                fontSize: '16px',
                padding: '14px 18px',
                height: 'auto',
                minHeight: '22px',
            }
        }
    },
    MuiChip: {
        styleOverrides: {
            root: {
                backgroundColor: '#F9F9F9',
                borderRadius: '35px',
                padding: '7px 14px',
                height: '32px',
                lineHeight: '18px',
            },
            label: {
                paddingLeft: 0,
                paddingRight: 0,
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#363535',
            }
        }
    }
  },
});

export default theme;