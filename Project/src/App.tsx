import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './Components/DASH/AdminDashboard';
import AdminPanel from './Components/PANEL/AdminPanel'; 
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import './index.css';

// Simple Route Guard
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  return user ? <>{children}</> : <Navigate to="/" replace />;
};

export default function App() {
  const [tourismData, setTourismData] = React.useState({
    basicInfo: { name: "PANGLAO", province: "BOHOL", region: "VII" },
    officials: { mayor: "", viceMayor: "", council: ["", "", "", "", "", "", "", ""], tourismOfficer: "", planningCoordinator: "" },
    tourismAssets: { attractions: [], accommodations: [], profiles: [], facilities: [] },
    transportation: {}, 
    // Institutional Flat Structure
    institutionalFacilities: [],
    laborForce: {},
    revenueData: {},
    emergencyContacts: [],
    tourismEducation: [],
    tourismProjects: [],
    crimeIncidents: {},
    hazardMatrix: {}
  });

  // THE BRIDGE: Saves data and notifies other components
  const handleSave = () => {
    localStorage.setItem('tourism_data', JSON.stringify(tourismData));
    // This custom event allows the dashboard to update even in the same tab
    window.dispatchEvent(new Event("storage"));
    alert("DATABASE UPDATED SUCCESSFULLY!");
  };

  // Initial Load
  React.useEffect(() => {
    const saved = localStorage.getItem('tourism_data');
    if (saved) {
      try {
        setTourismData(JSON.parse(saved));
      } catch (e) {
        console.error("Data Corrupted", e);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin-panel" 
          element={
            <ProtectedRoute>
              <AdminPanel 
                editData={tourismData} 
                setEditData={setTourismData} 
                onSave={handleSave} 
              />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}