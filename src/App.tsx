import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/Page/MainLayout';
import Players from "./pages/Players";
import PlayerProfile from './pages/PlayerProfile';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Players />} />
          <Route path="profile/:userName" element={<PlayerProfile />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
