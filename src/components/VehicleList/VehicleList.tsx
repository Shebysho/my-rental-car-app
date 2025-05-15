import Grid from '@mui/material/Grid';
import { CatalogItem } from '@/redux/catalog/catalogTypes';
import VehicleCard from '../VehicleCard/VehicleCard';

type VehicleListProps = {
  vehicles: CatalogItem[];
  onOpenModal: (id: string) => void;
};

const VehicleList = ({ vehicles, onOpenModal }: VehicleListProps) => {
  if (!vehicles || vehicles.length === 0) {
    return null;
  }

  return (
    <Grid 
      container 
      spacing={3.625}
      justifyContent="center"
    >
      {vehicles.map((vehicle) => (
        <Grid 
          item 
          key={vehicle.id}
          xs={12} 
          sm={6}  
          md={4}  
          lg={3}  
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
          }}
        >
          <VehicleCard vehicle={vehicle} onOpenModal={onOpenModal} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VehicleList;