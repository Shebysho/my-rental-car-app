import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchVehicleById } from '@/redux/catalog/catalogThunks';
import { selectCurrentVehicle, selectIsLoading, selectError } from '@/redux/catalog/catalogSelectors';
import { clearCurrentVehicle } from '@/redux/catalog/catalogSlice';
import {
  Box, CircularProgress, Typography, Button, Stack, Divider, Chip, IconButton,
  TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { CatalogItem } from '@/redux/catalog/catalogTypes'; // Залишаємо, бо vehicle типізується
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

type VehicleDetailsModalContentProps = {
  vehicleId: string;
  onClose: () => void;
};

const BookingSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name too short').max(70, 'Name too long').required('Name is required'),
  phoneNumber: Yup.string()
    .matches(/^[+]?[0-9]{10,15}$/, 'Invalid phone number format (e.g., +380XXXXXXXXX)')
    .required('Phone number is required'),
  bookingDate: Yup.date()
    .min(new Date(new Date().setHours(0, 0, 0, 0)), "Booking date cannot be in the past")
    .required('Booking date is required')
    .typeError('Invalid date format. Please use YYYY-MM-DD'),
  comment: Yup.string().max(250, 'Comment is too long (max 250 characters)'),
});

const VehicleDetailsModalContent = ({ vehicleId, onClose }: VehicleDetailsModalContentProps) => {
  const dispatch = useAppDispatch();
  const vehicle: CatalogItem | null = useAppSelector(selectCurrentVehicle);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (vehicleId) {
      dispatch(fetchVehicleById(vehicleId));
    }
    return () => {
      dispatch(clearCurrentVehicle());
    };
  }, [dispatch, vehicleId]);

  if (isLoading && !vehicle) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: {xs: 2, md: 5}, minHeight: 300 }}><CircularProgress /></Box>;
  }

  if (error && !vehicle) {
    return (
      <Box sx={{p:{xs: 2, md: 4}, textAlign: 'center'}}>
        <Typography color="error" gutterBottom>Error: {error}</Typography>
        {onClose && <Button onClick={onClose} variant="outlined" sx={{mt:2}}>Close</Button>}
      </Box>
    );
  }

  if (!vehicle) {
    return (
      <Box sx={{p:{xs: 2, md: 4}, textAlign: 'center'}}>
        <Typography gutterBottom>Vehicle details not found.</Typography>
        {onClose && <Button onClick={onClose} variant="outlined" sx={{mt:2}}>Close</Button>}
      </Box>
    );
  }

  const addressParts = vehicle.address?.split(',') || [];
  const city = addressParts[1]?.trim() || '';
  const country = addressParts[2]?.trim() || '';
  
  let rentalConditionsDisplayItems: string[] = [];
  if (typeof vehicle.rentalConditions === 'string' && vehicle.rentalConditions.trim() !== '') {
    rentalConditionsDisplayItems = vehicle.rentalConditions.split('\n').map(cond => {
      const match = cond.match(/(\d+)/);
      if (match) {
        const ageOrYear = match[1];
        return cond.replace(ageOrYear, `<span style="color: #3470FF; font-weight: 600;">${ageOrYear}</span>`);
      }
      return cond;
    });
  } else if (Array.isArray(vehicle.rentalConditions)) {
     rentalConditionsDisplayItems = vehicle.rentalConditions.map(cond => {
        const conditionString = String(cond);
        const match = conditionString.match(/(\d+)/);
        if (match) {
            const ageOrYear = match[1];
            return conditionString.replace(ageOrYear, `<span style="color: #3470FF; font-weight: 600;">${ageOrYear}</span>`);
        }
        return conditionString;
    });
  }
  
  const formattedMileage = vehicle.mileage?.toLocaleString('de-DE') || 'N/A';
  const formattedPrice = vehicle.rentalPrice ? `${vehicle.rentalPrice.replace('$', '')}$` : 'N/A';

  const allFeatures = [...(vehicle.accessories || []), ...(vehicle.functionalities || [])];

  return (
    <Box sx={{position: 'relative'}}>
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: {xs: 12, md: 16},
            top: {xs: 12, md: 16},
            color: '#121417',
            zIndex: 10,
          }}
        >
          <CloseIcon sx={{width: 24, height: 24}}/>
        </IconButton>
      )}

      <Box
        component="img"
        src={vehicle.img || `https://placehold.co/461x248/EFEFF1/AAAAAA?text=No+Image&font=manrope`}
        alt={`${vehicle.make || 'Vehicle'} ${vehicle.model || ''}`}
        sx={{ width: '100%', height: 248, objectFit: 'cover', borderRadius: '14px', display: 'block', mb: '14px' }}
      />
      <Typography variant="body1" component="h2" sx={{ fontWeight: 500, fontSize: '18px', lineHeight: 1.333, mb: '8px', color: '#121417' }}>
        {vehicle.make || 'N/A'} <Box component="span" sx={{ color: vehicle.model ? 'primary.light' : 'inherit' }}>{vehicle.model || 'N/A'}</Box>, {vehicle.year || 'N/A'}
      </Typography>

      <Stack direction="row" spacing={0.75} sx={{ color: 'rgba(18, 20, 23, 0.5)', fontSize: '12px', lineHeight: 1.5, mb: 0.5 }} flexWrap="wrap" useFlexGap>
        {city && <Typography variant="inherit">{city}</Typography>}
        {city && country && <Divider orientation="vertical" flexItem sx={{ height: '16px', bgcolor: 'rgba(18, 20, 23, 0.1)' }} />}
        {country && <Typography variant="inherit">{country}</Typography>}
        {(city || country) && vehicle.id && <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: '16px', bgcolor: 'rgba(18, 20, 23, 0.1)' }} />}
        {vehicle.id && <Typography variant="inherit">Id: {vehicle.id}</Typography>}
        {vehicle.id && vehicle.year && <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: '16px', bgcolor: 'rgba(18, 20, 23, 0.1)' }} /> }
        {vehicle.year && <Typography variant="inherit">Year: {vehicle.year}</Typography>}
        {vehicle.year && vehicle.type && <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: '16px', bgcolor: 'rgba(18, 20, 23, 0.1)' }} /> }
        {vehicle.type && <Typography variant="inherit">Type: {vehicle.type}</Typography>}
      </Stack>
      <Stack direction="row" spacing={0.75} sx={{ color: 'rgba(18, 20, 23, 0.5)', fontSize: '12px', lineHeight: 1.5, mb: '14px' }} flexWrap="wrap" useFlexGap>
        {vehicle.fuelConsumption && <Typography variant="inherit">Fuel Consumption: {vehicle.fuelConsumption}</Typography>}
        {vehicle.fuelConsumption && vehicle.engineSize && <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: '16px', bgcolor: 'rgba(18, 20, 23, 0.1)' }} />}
        {vehicle.engineSize && <Typography variant="inherit">Engine Size: {vehicle.engineSize}</Typography>}
      </Stack>
      
      <Typography variant="body2" sx={{ marginBottom: '24px', lineHeight: 1.428, color: '#121417', fontSize: '14px' }}>
        {vehicle.description || 'No description available.'}
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ fontSize: '14px', fontWeight: 500, color: '#121417', mb: '8px' }}>
        Accessories and functionalities:
      </Typography>
      <Stack direction="row" spacing={0.75} sx={{ color: 'rgba(18, 20, 23, 0.5)', fontSize: '12px', lineHeight: 1.5, mb: '24px' }} flexWrap="wrap" useFlexGap>
        {allFeatures.length > 0 ? allFeatures.map((item, index, arr) => (
          <React.Fragment key={`feature-${index}`}>
            <Typography variant="inherit">{item}</Typography>
            {index < arr.length -1 && <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: '16px', bgcolor: 'rgba(18, 20, 23, 0.1)' }} />}
          </React.Fragment>
        )) : <Typography variant="inherit">No specific accessories or functionalities listed.</Typography>}
      </Stack>

      <Typography variant="body1" gutterBottom sx={{ fontSize: '14px', fontWeight: 500, color: '#121417', mb: '8px' }}>
        Rental Conditions:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', mb: '24px' }}>
        {rentalConditionsDisplayItems.length > 0 ? rentalConditionsDisplayItems.map((condition, index) => (
          <Chip 
            key={`cond-${index}`} 
            label={<Typography variant="body2" component="span" sx={{fontSize: '12px', fontWeight: 400, letterSpacing: '-0.02em', color: '#363535'}} dangerouslySetInnerHTML={{ __html: condition }} />}
            sx={{ backgroundColor: '#F9F9F9', borderRadius: '35px', padding: '7px 14px', height: '32px',lineHeight: '20px' }}
          />
        )) : <Typography variant="inherit" sx={{fontSize: '12px', color: 'rgba(18, 20, 23, 0.5)'}}>Details upon request.</Typography>}
        <Chip 
          label={<Typography variant="body2" component="span" sx={{fontSize: '12px', fontWeight: 400, letterSpacing: '-0.02em', color: '#363535'}}>Mileage: <Box component="span" sx={{color: '#3470FF', fontWeight: 600}}>{formattedMileage}</Box></Typography>} 
          sx={{ backgroundColor: '#F9F9F9', borderRadius: '35px', padding: '7px 14px', height: '32px', lineHeight: '20px' }}
        />
        <Chip 
          label={<Typography variant="body2" component="span" sx={{fontSize: '12px', fontWeight: 400, letterSpacing: '-0.02em', color: '#363535'}}>Price: <Box component="span" sx={{color: '#3470FF', fontWeight: 600}}>{formattedPrice}</Box></Typography>} 
          sx={{ backgroundColor: '#F9F9F9', borderRadius: '35px', padding: '7px 14px', height: '32px', lineHeight: '20px' }}
        />
      </Box>

      <Divider sx={{mb: '24px', borderColor: 'rgba(18, 20, 23, 0.1)' }} /> 

      <Typography variant="h3" component="h3" sx={{ fontWeight: 500, fontSize: '18px', lineHeight: 1.33, mb: '14px', color: '#121417' }}>
        Book your car now
      </Typography>
      <Formik
        initialValues={{
          name: '',
          phoneNumber: '',
          bookingDate: '',
          comment: '',
        }}
        validationSchema={BookingSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log('Booking Submitted:', { vehicleId: vehicle.id, ...values });
          alert(`Thank you, ${values.name}! Your booking for ${vehicle.make} ${vehicle.model} on ${values.bookingDate} is confirmed (details in console). This is a demo, no actual booking made.`);
          setSubmitting(false);
          resetForm();
          if(onClose) onClose();
        }}
      >
        {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
          <Form>
            <Stack spacing={1.75}>
              <TextField
                fullWidth
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                placeholder="Name"
                variant="filled"
                hiddenLabel 
                InputProps={{ disableUnderline: true, sx: {borderRadius: '10px', bgcolor: '#F7F7FB', fontSize: '16px', padding: '12px 18px', height: '50px' } }}
              />
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                placeholder="Phone number"
                variant="filled"
                hiddenLabel
                InputProps={{ disableUnderline: true, sx: {borderRadius: '10px', bgcolor: '#F7F7FB', fontSize: '16px', padding: '12px 18px', height: '50px'} }}
              />
              <TextField
                fullWidth
                id="bookingDate"
                name="bookingDate"
                type="date"
                value={values.bookingDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.bookingDate && Boolean(errors.bookingDate)}
                helperText={touched.bookingDate && errors.bookingDate}
                InputLabelProps={{ shrink: true }}
                variant="filled"
                hiddenLabel
                placeholder="Booking date"
                InputProps={{ disableUnderline: true, sx: {borderRadius: '10px', bgcolor: '#F7F7FB', fontSize: '16px', padding: '12px 18px', height: '50px',  '&::-webkit-calendar-picker-indicator': { marginRight: '8px' } } }}
              />
              <TextField
                fullWidth
                id="comment"
                name="comment"
                multiline
                rows={2.5}
                value={values.comment}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.comment && Boolean(errors.comment)}
                helperText={touched.comment && errors.comment}
                placeholder="Comment"
                variant="filled"
                hiddenLabel
                InputProps={{ disableUnderline: true, sx: {borderRadius: '10px', bgcolor: '#F7F7FB', fontSize: '16px', padding: '12px 18px', minHeight: '50px'} }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                disabled={isSubmitting}
                fullWidth={false}
                sx={{ 
                  padding: '12px 50px', 
                  borderRadius: '12px', 
                  bgcolor: (theme) => theme.palette.primary.light, 
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: 1.428,
                  textTransform: 'none',
                  alignSelf: 'flex-start',
                  mt: '10px', 
                  color: (theme) => theme.palette.common.white,
                  '&:hover': { bgcolor: (theme) => theme.palette.primary.main } 
                }}
              >
                Rent
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default VehicleDetailsModalContent;