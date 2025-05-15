import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosInstance from '@/api/axiosInstance';
import type { CatalogItem, Filters } from './catalogTypes';

export type FetchVehiclesApiResponse = {
  cars: CatalogItem[];
  totalCars?: number;
  page?: string;
};

export type FetchVehiclesParams = Partial<Filters> & { page: number; limit: number };

export const loadInitialVehicles = createAsyncThunk<
  FetchVehiclesApiResponse,
  FetchVehiclesParams,
  { rejectValue: string }
>(
  'catalog/loadInitial',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<FetchVehiclesApiResponse>('/cars', { params });
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response && typeof error.response.data?.message === 'string') {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Failed to load vehicles.');
    }
  }
);

export const loadMoreVehicles = createAsyncThunk<
  FetchVehiclesApiResponse,
  FetchVehiclesParams,
  { rejectValue: string }
>(
  'catalog/loadMore',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<FetchVehiclesApiResponse>('/cars', { params });
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response && typeof error.response.data?.message === 'string') {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Failed to load more vehicles.');
    }
  }
);

export const fetchVehicleById = createAsyncThunk<
  CatalogItem,
  string,
  { rejectValue: string }
>(
  'catalog/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<CatalogItem>(`/cars/${id}`);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response && typeof error.response.data?.message === 'string') {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(`Failed to load vehicle details for ID: ${id}.`);
    }
  }
);