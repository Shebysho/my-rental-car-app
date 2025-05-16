import { useDispatch, useSelector } from 'react-redux';
import { catalogSelectors } from '@/redux';
import type { AppDispatch, RootState } from '@/redux/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useCatalogState = () => {
  const items = useAppSelector(catalogSelectors.selectVehicles);
  const favourites = useAppSelector(catalogSelectors.selectFavourites);
  const filters = useAppSelector(catalogSelectors.selectFilters);
  const isLoading = useAppSelector(catalogSelectors.selectIsLoading);
  const page = useAppSelector(catalogSelectors.selectPage);
  const limit = useAppSelector(catalogSelectors.selectLimit);
  const totalPages = useAppSelector(catalogSelectors.selectTotalPages);
  const queryParams = useAppSelector(catalogSelectors.selectQueryParams); 
  const error = useAppSelector(catalogSelectors.selectError);
  const totalItems = useAppSelector(catalogSelectors.selectTotalItems);

  return {
    vehicles: items,
    favourites,
    filters,
    isLoading,
    page,
    limit,
    totalPages,
    totalItems,
    error,
    queryParams: queryParams,
  };
};