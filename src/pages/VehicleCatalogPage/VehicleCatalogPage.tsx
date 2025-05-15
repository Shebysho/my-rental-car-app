import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Modal } from '@mui/material';
import { useAppDispatch, useCatalogState } from '@/hooks/reduxHooks';
import { catalogOperations } from '@/redux';
import VehicleList from '@/components/VehicleList/VehicleList';
import VehicleFilters from '@/components/VehicleFilters/VehicleFilters';
import VehicleDetailsModalContent from '@/components/VehicleDetailsModalContent/VehicleDetailsModalContent';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 'calc(100% - 30px)', sm: 500, md: 541 },
  bgcolor: 'background.paper',
  borderRadius: '24px',
  boxShadow: 24,
  p: { xs: '24px', md: '40px' },
  maxHeight: '95vh', // Збільшено для вмісту
  overflowY: 'auto',
};

const VehicleCatalogPage = () => {
  const dispatch = useAppDispatch();
  const {
    vehicles,
    queryParams,
    isLoading,
    page,
    totalPages,
    error
  } = useCatalogState();

  const [openModal, setOpenModal] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  useEffect(() => {
    if (queryParams && !selectedVehicleId) {
      dispatch(catalogOperations.loadInitialVehicles(queryParams));
    }
  }, [dispatch, queryParams, selectedVehicleId]);

  const handleLoadMore = () => {
    if (page < totalPages && !isLoading && queryParams) {
      dispatch(catalogOperations.loadMoreVehicles({ ...queryParams, page: page + 1 }));
    }
  };

  const handleOpenModal = (id: string) => {
    setSelectedVehicleId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVehicleId(null);
  };

  let contentDisplay;
  if (isLoading && (!vehicles || vehicles.length === 0) && !selectedVehicleId) {
    contentDisplay = <Typography sx={{ textAlign: 'center', width: '100%', mt: 4 }}>Loading vehicles...</Typography>;
  } else if (error && !selectedVehicleId) {
    contentDisplay = <Typography color="error" sx={{ textAlign: 'center', width: '100%', mt: 4 }}>Error: {error}</Typography>;
  } else if (!isLoading && vehicles && vehicles.length === 0 && !selectedVehicleId) {
    contentDisplay = <Typography sx={{ textAlign: 'center', width: '100%', mt: 4 }}>No vehicles found matching your criteria.</Typography>;
  } else if (vehicles && vehicles.length > 0) {
    contentDisplay = <VehicleList vehicles={vehicles} onOpenModal={handleOpenModal} />;
  }

  return (
    <Box
      component="section"
      sx={{
        paddingTop: '40px',
        paddingBottom: '100px',
      }}
    >
      <Container>
        <Box sx={{ marginBottom: '50px' }}>
          <VehicleFilters />
        </Box>

        <Box> 
          {contentDisplay}
        </Box>
        
        {page < totalPages && !isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Button
              variant="contained"
              onClick={handleLoadMore}
              disabled={isLoading}
              sx={{ 
                color: 'white',
                bgcolor: '#3470FF',
                paddingX: '44px',
                paddingY: '12px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '16px',
                borderRadius: '12px',
                '&:hover': {
                  bgcolor: '#0B44CD',
                }
              }}
            >
              Load More
            </Button>
          </Box>
        )}
      </Container>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="vehicle-details-modal-title"
        aria-describedby="vehicle-details-modal-description"
        sx={{'.MuiBackdrop-root': { backdropFilter: 'blur(2px)' }}}
      >
        <Box sx={modalStyle}>
          {selectedVehicleId && (
            <VehicleDetailsModalContent 
              vehicleId={selectedVehicleId} 
              onClose={handleCloseModal}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default VehicleCatalogPage;