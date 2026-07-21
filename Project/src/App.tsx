import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardDataWrapper from './Components/DASH/DashboardDataWrapper'; 
import AdminPanel from './Components/PANEL/AdminPanel'; 
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import './index.css';

// --- ROUTE GUARD ---
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  return user ? <>{children}</> : <Navigate to="/" replace />;
};

export default function App() {
  // Force a fresh console log to verify new bundle build
  React.useEffect(() => {
    console.log("🚀 LATEST FRONTEND BUILD LOADED SUCCESSFULLY!");
  }, []);

  const handleSave = () => {
    window.dispatchEvent(new Event("db_data_updated"));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* PRIVATE DASHBOARD ROUTE */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardDataWrapper />
            </ProtectedRoute>
          } 
        />

        {/* PRIVATE ADMIN PANEL ROUTE */}
        <Route 
          path="/admin-panel" 
          element={
            <ProtectedRoute>
              <AdminPanel onSave={handleSave} />
            </ProtectedRoute>
          } 
        />
        
        {/* CATCH-ALL REDIRECT */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}