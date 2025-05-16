import '@mui/material/styles';
import '@mui/material/Typography';
import '@mui/material/Button'; 
import { Breakpoint } from '@mui/material/styles';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    navLink: true; 
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    navLink: React.CSSProperties; 
  }

  interface TypographyVariantsOptions {
    navLink?: React.CSSProperties;
  }

  // }
}


declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    appButton: true;
  }
}
