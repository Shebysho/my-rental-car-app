import { Box, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MainNav from '@/components/MainNav/MainNav';

const PageHeader = () => {
  return (
    <Box 
      component="header" 
      sx={{ 
        borderBottom: '1px solid rgba(18, 20, 23, 0.1)',
        backgroundColor: '#FFFFFF', 
        height: '68px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container sx={{height: '100%'}}>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <RouterLink to="/" aria-label="Rental Car Home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, fontSize: '20px' }}>
              <Box component="span" sx={{ color: '#0B44CD' }}>Rental</Box>
              <Box component="span" sx={{ color: '#3470FF' }}>Car</Box>
            </Typography>
          </RouterLink>
          <MainNav />
        </Stack>
      </Container>
    </Box>
  );
};

export default PageHeader;