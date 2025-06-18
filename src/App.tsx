import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/Page/MainLayout';
const Players = React.lazy(() => import('./pages/Players'));
const PlayerProfile = React.lazy(() => import('./pages/PlayerProfile'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Players />} />
            <Route path="profile/:userName" element={<PlayerProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
