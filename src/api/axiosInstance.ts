import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';

const API_BASE_URL: string = 'https://car-rental-api.goit.global';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

export default axiosInstance;