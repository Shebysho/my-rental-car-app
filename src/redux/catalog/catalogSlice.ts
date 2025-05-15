import { createSlice, PayloadAction, CaseReducer, AnyAction } from '@reduxjs/toolkit';
import type { CatalogState, CatalogItem, Filters } from './catalogTypes';
import { loadInitialVehicles, loadMoreVehicles, fetchVehicleById } from './catalogThunks';
import type { FetchVehiclesApiResponse, FetchVehiclesParams } from './catalogThunks';

interface RejectedAction extends AnyAction {
  payload: string | undefined; 
  meta: {
    arg: any; 
    requestId: string;
    aborted: boolean;
    condition: boolean;
  };
  error: {
    message?: string;
    name?: string;
    stack?: string;
    code?: string;
  };
}

interface FulfilledThunkAction<Returned, ThunkArg> extends AnyAction {
  payload: Returned;
  meta: {
    arg: ThunkArg;
    requestId: string;
    requestStatus: 'fulfilled';
  };
}

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

const handlePending: CaseReducer<CatalogState> = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejectedReducer: CaseReducer<CatalogState, RejectedAction> = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message || 'An unknown error occurred';
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
      .addCase(loadInitialVehicles.fulfilled, (state, action: FulfilledThunkAction<FetchVehiclesApiResponse, FetchVehiclesParams>) => {
        state.items = action.payload.cars || [];
        state.page = action.payload.page ? parseInt(action.payload.page, 10) : 1;
        const totalCars = action.payload.totalCars || 0;
        state.totalItems = totalCars;
        state.totalPages = state.limit > 0 ? Math.ceil(totalCars / state.limit) : 0;
        state.isLoading = false;
      })
      .addCase(loadInitialVehicles.rejected, handleRejectedReducer)

      .addCase(loadMoreVehicles.pending, handlePending)
      .addCase(loadMoreVehicles.fulfilled, (state, action: FulfilledThunkAction<FetchVehiclesApiResponse, FetchVehiclesParams>) => {
        state.items.push(...(action.payload.cars || []));
        state.page = action.payload.page ? parseInt(action.payload.page, 10) : state.page;
        if (action.payload.totalCars !== undefined) {
            const totalCars = action.payload.totalCars;
            state.totalItems = totalCars;
            state.totalPages = state.limit > 0 ? Math.ceil(totalCars / state.limit) : 0;
        }
        state.isLoading = false;
      })
      .addCase(loadMoreVehicles.rejected, handleRejectedReducer)

      .addCase(fetchVehicleById.pending, handlePending)
      .addCase(fetchVehicleById.fulfilled, (state, action: PayloadAction<CatalogItem>) => {
        state.currentVehicle = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchVehicleById.rejected, handleRejectedReducer),
});

export const {
  addFavourite, removeFavourite, setFilters, setPage, clearCurrentVehicle,
} = catalogSlice.actions;

export default catalogSlice.reducer;