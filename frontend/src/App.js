import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import PlansPage from './pages/PlansPage';
import CouponsPage from './pages/CouponsPage';
import StoresPage from './pages/StoresPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Layout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/plans" element={<PlansPage />} />
                  <Route path="/coupons" element={<CouponsPage />} />
                  <Route path="/stores" element={<StoresPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
