import Box from '@mui/material/Box';
import type { CatalogItem } from '@/redux/catalog/catalogTypes';
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
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '29px', 
        rowGap: '50px',
      }}
    >
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} onOpenModal={onOpenModal} />
      ))}
    </Box>
  );
};

export default VehicleList;