import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import homeBG1x from '@/assets/img/home/background.jpg';
import homeBG2x from '@/assets/img/home/background@2x.jpg';

const HomePage = () => {
  return (
    <Box
      component="section"
      sx={{
        minHeight: 'calc(100vh - 70px)', // Assuming header height might be around 70px
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: { xs: '180px', md: '250px' }, // Adjusted responsive padding
        paddingBottom: { xs: '80px', md: '100px' },
        backgroundImage: `url(${homeBG1x})`, // Simpler for one image, add image-set if needed
        '@media (min-resolution: 192dpi), (min-resolution: 2dppx)': {
          backgroundImage: `url(${homeBG2x})`,
        },
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center', // Centered background
        backgroundSize: 'cover', // Ensure background covers the area
      }}
    >
      <Container sx={{ textAlign: 'center' }}>
        <Typography
          variant="h1"
          component="h1" 
          sx={{ 
            marginBottom: '24px',
            color: 'white',
            fontSize: { xs: '2.5rem', md: '3.5rem' } 
          }}
        >
          Find your perfect rental car
        </Typography>
        <Typography
          variant="h2"
          component="p" 
          sx={{ 
            marginBottom: '32px', 
            color: 'rgba(255, 255, 255, 0.85)', 
            fontSize: { xs: '1rem', md: '1.25rem' }, 
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Reliable and budget-friendly rentals for any journey
        </Typography>
        <Button
          component={Link}
          to="/catalog"
          variant="contained"
          color="primary"    
          size="large"       
          sx={{
            paddingX: '44px',
            paddingY: '14px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '16px',
            borderRadius: '12px',
          }}
        >
          View Catalog
        </Button>
      </Container>
    </Box>
  );
};

export default HomePage;