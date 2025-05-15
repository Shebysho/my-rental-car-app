import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Filters } from './catalogTypes';

export const selectAllItems = (state: RootState) => state.catalog.items;
export const selectFavourites = (state: RootState) => state.catalog.favourites;
export const selectFilters = (state: RootState) => state.catalog.filters;
export const selectIsLoading = (state: RootState) => state.catalog.isLoading;
export const selectPage = (state: RootState) => state.catalog.page;
export const selectLimit = (state: RootState) => state.catalog.limit;
export const selectTotalPages = (state: RootState) => state.catalog.totalPages;
export const selectCurrentVehicle = (state: RootState) => state.catalog.currentVehicle;
export const selectError = (state: RootState) => state.catalog.error;
export const selectTotalItems = (state: RootState) => state.catalog.totalItems;

export const selectVehicles = (state: RootState) => state.catalog.items;

export const selectQueryParams = createSelector(
  [selectFilters, selectPage, selectLimit],
  (filters, page, limit) => {
    const activeFilters: Partial<Filters> = {};

    (Object.keys(filters) as Array<keyof Filters>).forEach((key) => {
      const value = filters[key];
      if (value !== null && value !== undefined && String(value).trim() !== '') {
        activeFilters[key] = value as any;
      }
    });

    return {
      ...activeFilters,
      page,
      limit,
    };
  }
);