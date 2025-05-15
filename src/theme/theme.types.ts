import '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    desktop: true;
  }
  interface TypographyVariants {
    navLink: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    navLink?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    navLink: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    appButton: true;
  }
}