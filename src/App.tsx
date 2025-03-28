import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomeLayout } from './components/HomeLayout';
import { ThemeProvider } from './components/ThemeProvider';
import { Home } from './pages/Home';
import { BasicDemo } from './pages/BasicDemo';
import { MultiStoreDemo } from './pages/MultiStoreDemo';
import { PersistenceDemo } from './pages/PersistenceDemo';
import { SlicesDemo } from './pages/SlicesDemo';
import { PerformanceDemo } from './pages/PerformanceDemo';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path="basic" element={<BasicDemo />} />
            <Route path="multi-store" element={<MultiStoreDemo />} />
            <Route path="persistence" element={<PersistenceDemo />} />
            <Route path="slices" element={<SlicesDemo />} />
            <Route path="performance" element={<PerformanceDemo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;