import '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: false;
    tablet: false;
    desktop: false;
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