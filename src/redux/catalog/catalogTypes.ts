export type CatalogItem = {
  id: string;
  year: number;
  make: string;
  model: string;
  type: string;
  img?: string;
  imgWebp?: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string; 
  mileage: number;
};

export type Filters = {
  make: string | null;
  rentalPrice: number | null; 
  mileageFrom: number | null;
  mileageTo: number | null;
};

export type CatalogState = {
  items: CatalogItem[];
  favourites: string[]; 
  currentVehicle: CatalogItem | null;
  filters: Filters;
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  error: string | null;
};