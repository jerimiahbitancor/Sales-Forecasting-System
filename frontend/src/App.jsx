import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../src/features/auth/pages/register/Register';
import Login from '../src/features/auth/pages/login/Login';
//import ForgotPassword from '../src/features/auth/pages/forgot-password/ForgotPassword';
import Dashboard from './features/dashboard/pages/Dashboard';
import DataManagement from './features/datamanagement/pages/DataManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/data-management' element={<DataManagement />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;