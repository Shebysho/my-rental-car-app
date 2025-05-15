import { Stack } from '@mui/material';
import NavLink from '../ui/NavLink/NavLink';

const MainNav = () => {
  return (
    <Stack component="nav" direction="row" spacing={4} alignItems="center">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/catalog">Catalog</NavLink>
    </Stack>
  );
};

export default MainNav;