import { Link as MuiLink } from '@mui/material';
import { NavLink as RouterNavLink, useMatch, useResolvedPath } from 'react-router-dom';
import type { ReactNode } from 'react';

type CustomNavLinkProps = {
  children: ReactNode;
  to: string;
  end?: boolean;
};

const NavLink = ({ children, to, end = false }: CustomNavLinkProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: end });

  return (
    <MuiLink
      component={RouterNavLink}
      to={to}
      end={end}
      variant="navLink" 
      underline="none"
      sx={{
        fontWeight: match ? 600 : 500,
        color: match ? 'primary.light' : 'text.primary',
      }}
    >
      {children}
    </MuiLink>
  );
};

export default NavLink;