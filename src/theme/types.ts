import '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    navLink?: React.CSSProperties;
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