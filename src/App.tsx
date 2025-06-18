import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainLayout from './layouts/Page/MainLayout';
import Players from "./pages/Players";
import PlayerProfile from './pages/PlayerProfile';

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Players />} />
          <Route path="profile/:userName" element={<PlayerProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
