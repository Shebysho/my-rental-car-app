import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import type { CatalogItem } from '@/redux/catalog/catalogTypes';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addFavourite, removeFavourite } from '@/redux/catalog/catalogSlice';
import { selectFavourites } from '@/redux/catalog/catalogSelectors';

type VehicleCardProps = {
  vehicle: CatalogItem;
  onOpenModal: (id: string) => void;
};

const VehicleCard = ({ vehicle, onOpenModal }: VehicleCardProps) => {
  const dispatch = useAppDispatch();
  const favouriteIds = useAppSelector(selectFavourites);
  const isFavourite = favouriteIds.includes(vehicle.id);

  const addressParts = vehicle?.address?.split(',') || [];
  const city = addressParts[1]?.trim() || '';
  const country = addressParts[2]?.trim() || '';

  const handleToggleFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (isFavourite) {
      dispatch(removeFavourite(vehicle.id));
    } else {
      dispatch(addFavourite(vehicle.id));
    }
  };
  
  const formattedMileageText = vehicle?.mileage != null 
    ? `${vehicle.mileage.toLocaleString('de-DE')} km`
    : '';

  const detailsArray = [
    city,
    country,
    vehicle?.rentalCompany,
    vehicle?.type,
    vehicle?.make,
    formattedMileageText,
    vehicle?.functionalities?.[0] 
  ].filter(Boolean);

  return (
    <Card
      sx={{
        borderRadius: '14px',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%', 
        position: 'relative',
        width: 274,
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', paddingTop: 'calc(268 / 274 * 100%)' }}>
        <CardMedia
          component="img"
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '14px',
           }}
          image={vehicle?.img || `https://placehold.co/274x268/EFEFF1/AAAAAA?text=No+Image&font=manrope`}
          alt={`${vehicle?.make || ''} ${vehicle?.model || ''}`}
        />
        <IconButton
          onClick={handleToggleFavourite}
          aria-label="toggle favourite"
          sx={{
            position: 'absolute',
            top: 14,
            right: 14,
            color: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              color: 'rgba(255, 255, 255, 1)',
            },
            ...(isFavourite && {
              color: (theme) => theme.palette.primary.light, 
            }),
            zIndex: 1,
          }}
        >
          {isFavourite ? <Favorite sx={{ stroke: "white", strokeWidth: 0.5 }} /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      <CardContent sx={{ padding: '14px 0 0', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}
        >
          <Typography component="h3" sx={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.5, color: (theme) => theme.palette.text.primary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', pr: 1 }}>
            {vehicle?.make || ''}{' '}
            {vehicle?.model && (
              <Box component="span" sx={{ color: (theme) => theme.palette.primary.light }}> 
                {vehicle.model.length > 8 ? `${vehicle.model.substring(0,8)}...` : vehicle.model} 
              </Box>
            )}
            {vehicle?.year && `, ${vehicle.year}`}
          </Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.5, color: (theme) => theme.palette.text.primary, whiteSpace: 'nowrap', pl:1 }}>
            {vehicle?.rentalPrice || ''}
          </Typography>
        </Stack>
        
        <Box sx={{ flexGrow: 1, marginBottom: '28px' }}>
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              fontSize: '12px',
              lineHeight: 1.5,
              height: '36px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {detailsArray.join(' | ')}
          </Typography>
        </Box>

        <Button
          onClick={() => onOpenModal(vehicle.id)}
          variant="contained"
          fullWidth
          sx={{ 
            height: '44px',
            marginTop: 'auto', 
            paddingY: '12px', 
            borderRadius: '12px', 
            bgcolor: (theme) => theme.palette.primary.light, 
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'none',
            color: (theme) => theme.palette.common.white,
            '&:hover': { bgcolor: (theme) => theme.palette.primary.main } 
          }}
        >
          Read more
        </Button>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;