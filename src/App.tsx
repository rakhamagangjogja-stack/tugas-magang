import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import { getAuthToken } from './lib/storage';

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  if (!getAuthToken()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<RequireAuth>{<AdminPanel />}</RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
