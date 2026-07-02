import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../src/features/auth/pages/register/Register';
import Login from '../src/features/auth/pages/login/Login';
import ChefDuoLanding from './features/landing/ChefDuoLanding';
//import ForgotPassword from '../src/features/auth/pages/forgot-password/ForgotPassword';
import Dashboard from './features/dashboard/pages/Dashboard';
import DataManagement from './features/datamanagement/pages/DataManagement';
import Forecasting from './features/analytics/Forecasting';
import ProductPerformance from './features/analytics/ProductPerformance';
import Settings from './features/settings/Settings';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/landing" element={<ChefDuoLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/data-management' element={<DataManagement />} />
          <Route path='/analytics' element={<Analytics/>} />
          <Route path='/settings' element={<Settings />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;