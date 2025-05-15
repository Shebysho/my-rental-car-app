import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import type { CatalogState, CatalogItem, Filters } from './catalogTypes';
import { loadInitialVehicles, loadMoreVehicles, fetchVehicleById } from './catalogThunks';

const initialState: CatalogState = {
  items: [],
  favourites: [],
  currentVehicle: null,
  filters: {
    make: null,
    rentalPrice: null,
    mileageFrom: null,
    mileageTo: null,
  },
  page: 1,
  limit: 12,
  totalPages: 0,
  totalItems: 0,
  isLoading: false,
  error: null,
};

const handlePending: CaseReducer<CatalogState> = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected: CaseReducer<CatalogState, PayloadAction<unknown>> = (state, action) => {
  state.isLoading = false;
  state.error = action.payload as string || 'An unknown error occurred';
};

type VehiclesFetchedPayload = {
  cars: CatalogItem[];
  totalCars: number;
  page: string;
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<string>) => {
      if (!state.favourites.includes(action.payload)) {
        state.favourites.push(action.payload);
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(id => id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
      state.items = [];
      state.totalPages = 0;
      state.totalItems = 0;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    clearCurrentVehicle: state => {
      state.currentVehicle = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(loadInitialVehicles.pending, handlePending)
      .addCase(loadInitialVehicles.fulfilled, (state, action: PayloadAction<VehiclesFetchedPayload>) => {
        if (action.meta.arg.page === 1) {
          state.items = action.payload.cars;
        } else {
          state.items = action.payload.cars; 
        }
        state.page = parseInt(action.payload.page, 10);
        state.totalItems = action.payload.totalCars;
        state.totalPages = Math.ceil(action.payload.totalCars / state.limit);
        state.isLoading = false;
      })
      .addCase(loadInitialVehicles.rejected, handleRejected)

      .addCase(loadMoreVehicles.pending, handlePending)
      .addCase(loadMoreVehicles.fulfilled, (state, action: PayloadAction<VehiclesFetchedPayload>) => {
        state.items.push(...action.payload.cars);
        state.page = parseInt(action.payload.page, 10);
        state.totalItems = action.payload.totalCars;
        state.totalPages = Math.ceil(action.payload.totalCars / state.limit);
        state.isLoading = false;
      })
      .addCase(loadMoreVehicles.rejected, handleRejected)

      .addCase(fetchVehicleById.pending, handlePending)
      .addCase(fetchVehicleById.fulfilled, (state, action: PayloadAction<CatalogItem>) => {
        state.currentVehicle = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchVehicleById.rejected, handleRejected),
});

export const {
  addFavourite,
  removeFavourite,
  setFilters,
  setPage,
  clearCurrentVehicle,
} = catalogSlice.actions;

export default catalogSlice.reducer;