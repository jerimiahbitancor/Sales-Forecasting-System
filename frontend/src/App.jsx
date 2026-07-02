import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../src/features/auth/pages/register/Register';
import Login from '../src/features/auth/pages/login/Login';
import ChefDuoLanding from './features/landing/ChefDuoLanding';
//import ForgotPassword from '../src/features/auth/pages/forgot-password/ForgotPassword';
import Dashboard from './features/dashboard/pages/Dashboard';
import DataManagement from './features/datamanagement/pages/DataManagement';
import Forecasting from './features/Analytics/Forecasting';
import ProductPerformance from './features/Analytics/ProductPerformance';
import IngredientDemand from './features/Analytics/components/IngredientDemand'; // Add this when created
import Settings from './features/settings/Settings';
import Analytics from './features/Analytics/pages/Analytics';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Landing Page */}
          <Route path="/landing" element={<ChefDuoLanding />} />
          
          {/* Main App Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data-management" element={<DataManagement />} />
          <Route path="/analytics" element={<Analytics />} />
          {/* Analytics Routes */}
          <Route path="/forecasting" element={<Forecasting />} />
          <Route path="/product-performance" element={<ProductPerformance />} />
          <Route path="/ingredient-demand" element={<IngredientDemand />} />
          
          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
          
          {/* Profile */}
          <Route path="/profile" element={<Navigate to="/settings" replace />} />
          
    
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;