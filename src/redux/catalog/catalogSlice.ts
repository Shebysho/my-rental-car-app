import { createSlice, PayloadAction, AnyAction, SerializedError } from '@reduxjs/toolkit'; // Додано SerializedError
import type { CatalogState, CatalogItem, Filters } from './catalogTypes';
import { loadInitialVehicles, loadMoreVehicles, fetchVehicleById } from './catalogThunks';
import type { FetchVehiclesApiResponse, FetchVehiclesParams } from './catalogThunks';

const initialState: CatalogState = {
  items: [],
  favourites: [],
  currentVehicle: null,
  filters: { make: null, rentalPrice: null, mileageFrom: null, mileageTo: null },
  page: 1,
  limit: 12,
  totalPages: 0,
  totalItems: 0,
  isLoading: false,
  error: null,
};

const handlePending = (state: CatalogState) => {
  state.isLoading = true;
  state.error = null;
};

// Оновлений handleRejected
const handleGenericRejected = (state: CatalogState, action: PayloadAction<string | undefined, string, {arg: any, requestId: string, aborted: boolean, condition?: boolean, rejectedWithValue?: boolean }, SerializedError | any>) => {
  state.isLoading = false;
  if (action.meta.rejectedWithValue && typeof action.payload === 'string') {
    state.error = action.payload;
  } else if (action.error && typeof action.error.message === 'string') {
    state.error = action.error.message;
  } else {
    state.error = 'An unknown error occurred';
  }
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<string>) => {
      if (!state.favourites.includes(action.payload)) { state.favourites.push(action.payload); }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(id => id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1; state.items = []; state.totalPages = 0; state.totalItems = 0;
    },
    setPage: (state, action: PayloadAction<number>) => { state.page = action.payload; },
    clearCurrentVehicle: state => { state.currentVehicle = null; },
  },
  extraReducers: builder =>
    builder
      .addCase(loadInitialVehicles.pending, handlePending)
      .addCase(loadInitialVehicles.fulfilled, (state, action: PayloadAction<FetchVehiclesApiResponse, string, {arg: FetchVehiclesParams, requestId: string, requestStatus: 'fulfilled'}>) => {
        state.items = action.payload.cars || [];
        state.page = action.payload.page ? parseInt(action.payload.page, 10) : 1;
        const totalCarsValue = action.payload.totalCars;
        state.totalItems = typeof totalCarsValue === 'number' ? totalCarsValue : 0;
        state.totalPages = state.limit > 0 && state.totalItems > 0 ? Math.ceil(state.totalItems / state.limit) : 0;
        state.isLoading = false;
      })
      .addCase(loadInitialVehicles.rejected, handleGenericRejected) 
      .addCase(loadMoreVehicles.pending, handlePending)
      .addCase(loadMoreVehicles.fulfilled, (state, action: PayloadAction<FetchVehiclesApiResponse, string, {arg: FetchVehiclesParams, requestId: string, requestStatus: 'fulfilled'}>) => {
        state.items.push(...(action.payload.cars || []));
        state.page = action.payload.page ? parseInt(action.payload.page, 10) : state.page;
        const totalCarsValue = action.payload.totalCars;
        if (typeof totalCarsValue === 'number') {
            state.totalItems = totalCarsValue;
            state.totalPages = state.limit > 0 && state.totalItems > 0 ? Math.ceil(totalCarsValue / state.limit) : 0;
        }
        state.isLoading = false;
      })
      .addCase(loadMoreVehicles.rejected, handleGenericRejected)
      .addCase(fetchVehicleById.pending, handlePending)
      .addCase(fetchVehicleById.fulfilled, (state, action: PayloadAction<CatalogItem>) => { // Тут PayloadAction<CatalogItem> достатньо
        state.currentVehicle = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchVehicleById.rejected, handleGenericRejected), 
});

export const {
  addFavourite, removeFavourite, setFilters, setPage, clearCurrentVehicle,
} = catalogSlice.actions;

export default catalogSlice.reducer;