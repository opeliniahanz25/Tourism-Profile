import * as React from "react";
import AdminDashboard from './Components/DASH/AdminDashboard';
import AdminPanel from './Components/PANEL/AdminPanel'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import './index.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  return user ? <>{children}</> : <Navigate to="/" replace />;
};

export default function App() {
  const [tourismData, setTourismData] = React.useState({
    // Standard Info
    basicInfo: { name: "PANGLAO", province: "BOHOL", region: "VII" },
    officials: { mayor: "", viceMayor: "", council: ["", "", "", "", "", "", "", ""], tourismOfficer: "", planningCoordinator: "" },
    tourismAssets: { attractions: [], accommodations: [], profiles: [], facilities: [] },
    transportation: {}, 
    
    // Institutional (Flat Structure - No "institutional" folder)
    institutionalFacilities: [],
    laborForce: {},
    revenueData: {},
    emergencyContacts: [],
    tourismEducation: [],
    tourismProjects: [],
    crimeIncidents: {},
    hazardMatrix: {}
  });

  const handleSave = () => {
    localStorage.setItem('tourism_data', JSON.stringify(tourismData));
    // The "Ping" that wakes up the Dashboard
    window.dispatchEvent(new Event("storage"));
    alert("DATABASE FULLY UPDATED!");
  };

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
          element={<ProtectedRoute><AdminDashboard data={tourismData} /></ProtectedRoute>} 
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