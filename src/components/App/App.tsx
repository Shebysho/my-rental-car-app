import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import theme from '@/theme/theme';
import MainLayout from '@/components/ui/MainLayout/MainLayout';
import './App.css';

const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
const VehicleCatalogPage = lazy(() => import('@/pages/VehicleCatalogPage/VehicleCatalogPage'));
const VehicleDetailsPage = lazy(() => import('@/pages/VehicleDetailsPage/VehicleDetailsPage'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<VehicleCatalogPage />} />
            <Route path="/catalog/:id" element={<VehicleDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;