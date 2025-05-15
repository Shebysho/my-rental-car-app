import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosInstance from '@/api/axiosInstance';
import type { CatalogItem, Filters } from './catalogTypes';

type FetchVehiclesResponse = {
  cars: CatalogItem[];
  totalCars?: number;
  page?: number;
  totalPages?: number;
};

type FetchVehiclesParams = Partial<Filters> & { page: number; limit: number };

export const loadInitialVehicles = createAsyncThunk(
  'catalog/loadInitial',
  async (params: FetchVehiclesParams, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<FetchVehiclesResponse>('/cars', {
        params,
      });
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to load vehicles.');
      }
      return rejectWithValue('An unexpected error occurred while loading vehicles.');
    }
  }
);

export const loadMoreVehicles = createAsyncThunk(
  'catalog/loadMore',
  async (params: FetchVehiclesParams, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<FetchVehiclesResponse>('/cars', {
        params,
      });
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to load more vehicles.');
      }
      return rejectWithValue('An unexpected error occurred while loading more vehicles.');
    }
  }
);

export const fetchVehicleById = createAsyncThunk(
  'catalog/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<CatalogItem>(`/cars/${id}`);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || `Failed to load vehicle details for ID: ${id}.`);
      }
      return rejectWithValue('An unexpected error occurred while fetching vehicle details.');
    }
  }
);