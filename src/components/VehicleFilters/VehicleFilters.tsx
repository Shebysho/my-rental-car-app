import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setFilters } from '@/redux/catalog/catalogSlice';
import { selectFilters } from '@/redux/catalog/catalogSelectors';
import type { Filters } from '@/redux/catalog/catalogTypes';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, SelectChangeEvent, OutlinedInput } from '@mui/material';

const MOCK_MAKES = [
  "Buick", "Volvo", "HUMMER", "Subaru", "Mitsubishi", "Nissan", "Lincoln",
  "GMC", "Hyundai", "MINI", "Bentley", "Mercedes-Benz", "Aston Martin",
  "Pontiac", "Lamborghini", "Audi", "BMW", "Chevrolet", "Chrysler",
  "Kia", "Land Rover"
].sort();

const priceRangeOptions = () => {
  const options = [];
  for (let i = 30; i <= 300; i += 10) {
    options.push({ value: i, label: `$${i}` });
  }
  return options;
};

const VehicleFilters = () => {
  const dispatch = useAppDispatch();
  const currentGlobalFilters = useAppSelector(selectFilters);

  const [make, setMake] = useState<string>(currentGlobalFilters.make || '');
  const [rentalPrice, setRentalPrice] = useState<string>(
    currentGlobalFilters.rentalPrice ? String(currentGlobalFilters.rentalPrice) : ''
  );
  const [mileageFrom, setMileageFrom] = useState<string>(
    currentGlobalFilters.mileageFrom ? String(currentGlobalFilters.mileageFrom) : ''
  );
  const [mileageTo, setMileageTo] = useState<string>(
    currentGlobalFilters.mileageTo ? String(currentGlobalFilters.mileageTo) : ''
  );

  useEffect(() => {
    setMake(currentGlobalFilters.make || '');
    setRentalPrice(currentGlobalFilters.rentalPrice ? String(currentGlobalFilters.rentalPrice) : '');
    setMileageFrom(currentGlobalFilters.mileageFrom ? String(currentGlobalFilters.mileageFrom) : '');
    setMileageTo(currentGlobalFilters.mileageTo ? String(currentGlobalFilters.mileageTo) : '');
  }, [currentGlobalFilters]);

  const handleApplyFilters = () => {
    const newFilters: Partial<Filters> = {
      make: make || null,
      rentalPrice: rentalPrice ? parseInt(rentalPrice, 10) : null,
      mileageFrom: mileageFrom ? parseInt(mileageFrom, 10) : null,
      mileageTo: mileageTo ? parseInt(mileageTo, 10) : null,
    };
    dispatch(setFilters(newFilters));
  };
  
  const cleanNumericInput = (value: string) => value.replace(/[^0-9]/g, '');

  const commonSelectStyles = {
    borderRadius: '14px',
    backgroundColor: '#F7F7FB',
    height: '48px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(18, 20, 23, 0.2)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: (theme: any) => theme.palette.primary.light, // Додано (theme: any) для уникнення помилки типу
    },
    '.MuiSvgIcon-root ': {
      color: '#121417',
    }
  };

  const commonInputLabelStyles = {
    fontSize: '14px',
    fontWeight: 500,
    color: '#8A8A8F',
    mb: '8px',
    position: 'static' as 'static',
    transform: 'none',
    '&.Mui-focused': {
        color: '#8A8A8F',
    },
  };
  
  const commonTextFieldStyles = {
    height: '48px',
    backgroundColor: '#F7F7FB',
    '& .MuiOutlinedInput-root': {
      height: '100%',
      '& fieldset': {
        borderColor: 'transparent',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(18, 20, 23, 0.2)',
      },
      '&.Mui-focused fieldset': {
        borderColor: (theme: any) => theme.palette.primary.light, // Додано (theme: any)
      },
    },
    '& .MuiInputBase-input': {
      padding: '14px 18px',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: 1.11,
      color: '#121417',
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '18px', flexWrap: 'wrap', marginBottom: '50px' }}>
      <FormControl variant="outlined">
        <InputLabel sx={commonInputLabelStyles} shrink={false} focused={false} htmlFor="make-select-input">Car brand</InputLabel>
        <Select
          value={make}
          onChange={(e: SelectChangeEvent<string>) => setMake(e.target.value)}
          displayEmpty
          input={<OutlinedInput notched={false} id="make-select-input" sx={{fontSize: '18px', fontWeight: 500, lineHeight: 1.11, color: '#121417'}} />}
          sx={{...commonSelectStyles, width: 224 }}
          MenuProps={{ PaperProps: { sx: { borderRadius: '14px', marginTop: '4px', maxHeight: 272 }}}}
          renderValue={(selected) => {
            if (selected === "") {
              return <Box component="span" sx={{ fontStyle: 'normal', color: '#121417', fontSize: '18px', fontWeight: 500 }}>Choose a brand</Box>;
            }
            return selected;
          }}
        >
          {MOCK_MAKES.map((brand) => (
            <MenuItem key={brand} value={brand} sx={{fontSize: '16px', color: 'rgba(18, 20, 23, 0.20)', '&:hover': {color: '#121417'}, '&.Mui-selected': {color: '#121417', backgroundColor: 'rgba(52, 112, 255, 0.05)'}}}>{brand}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel sx={commonInputLabelStyles} shrink={false} focused={false} htmlFor="price-select-input">Price / 1 hour</InputLabel>
        <Select
          value={rentalPrice}
          onChange={(e: SelectChangeEvent<string>) => setRentalPrice(e.target.value)}
          displayEmpty
          input={<OutlinedInput notched={false} id="price-select-input" sx={{fontSize: '18px', fontWeight: 500, lineHeight: 1.11, color: '#121417'}}/>}
          sx={{ ...commonSelectStyles, width: 125 }}
          MenuProps={{ PaperProps: { sx: { borderRadius: '14px', marginTop: '4px', maxHeight: 272 }}}}
          renderValue={(selected) => {
            if (selected === "") {
              return <Box component="span" sx={{ fontStyle: 'normal', color: '#121417', fontSize: '18px', fontWeight: 500 }}>To $</Box>;
            }
            return `To $${selected}`;
          }}
        >
          {priceRangeOptions().map(option => (
            <MenuItem key={option.value} value={String(option.value)} sx={{fontSize: '16px', color: 'rgba(18, 20, 23, 0.20)', '&:hover': {color: '#121417'}, '&.Mui-selected': {color: '#121417', backgroundColor: 'rgba(52, 112, 255, 0.05)'}}}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel sx={commonInputLabelStyles} shrink={false} focused={false}>Car mileage / km</InputLabel>
        <Box sx={{ display: 'flex', height: '48px' }}>
          <TextField
            placeholder="From"
            variant="outlined"
            value={mileageFrom}
            onChange={(e) => setMileageFrom(cleanNumericInput(e.target.value))}
            InputProps={{ notched: false }}
            sx={{
              ...commonTextFieldStyles,
              width: 160,
              '& .MuiOutlinedInput-root': {
                ...commonTextFieldStyles['& .MuiOutlinedInput-root'],
                borderTopRightRadius: 0, 
                borderBottomRightRadius: 0,
                borderRight: '1px solid rgba(138, 138, 137, 0.20)',
              }
            }}
          />
          <TextField
            placeholder="To"
            variant="outlined"
            value={mileageTo}
            onChange={(e) => setMileageTo(cleanNumericInput(e.target.value))}
            InputProps={{ notched: false }}
            sx={{
              ...commonTextFieldStyles,
              width: 160,
              '& .MuiOutlinedInput-root': {
                ...commonTextFieldStyles['& .MuiOutlinedInput-root'],
                borderTopLeftRadius: 0, 
                borderBottomLeftRadius: 0,
              }
            }}
          />
        </Box>
      </FormControl>

      <Button 
        onClick={handleApplyFilters} 
        variant="contained" 
        sx={{ 
            height: '48px', 
            px: '44px', 
            bgcolor: (theme) => theme.palette.primary.light, 
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: 1.428,
            textTransform: 'none',
            boxShadow: 'none',
            color: 'white',
            '&:hover': { bgcolor: (theme) => theme.palette.primary.main, boxShadow: 'none' }
        }}>
        Search
      </Button>
    </Box>
  );
};

export default VehicleFilters;