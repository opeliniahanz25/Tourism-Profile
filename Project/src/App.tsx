import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardDataWrapper from './Components/DASH/DashboardDataWrapper'; 
import AdminPanel from './Components/PANEL/AdminPanel'; 
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import './index.css';

// --- ROUTE GUARD ---
// Checks if a user session exists in localStorage
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  return user ? <>{children}</> : <Navigate to="/" replace />;
};

export default function App() {
  // --- THE BRIDGE ---
  // Triggers custom event to notify DashboardDataWrapper to re-fetch from PostgreSQL
  const handleSave = () => {
    window.dispatchEvent(new Event("db_data_updated"));
    console.log("✅ TRIGGERED RE-FETCH FROM POSTGRESQL");
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
              {/* DashboardDataWrapper handles the DB Fetching automatically */}
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