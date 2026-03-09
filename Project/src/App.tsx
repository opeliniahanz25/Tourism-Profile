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
  // State for global management (Fallback/Legacy support)
  const [tourismData, setTourismData] = React.useState({
    basicInfo: { 
      name: "PANGLAO", 
      province: "BOHOL", 
      region: "VII",
      landArea: "",
      barangays: "",
      population: "",
      languages: "",
      religions: "",
      economicActivities: ""
    },
    officials: { 
      mayor: "", 
      viceMayor: "", 
      council: ["", "", "", "", "", "", "", ""], 
      tourismOfficer: "", 
      planningCoordinator: "",
      skFederationPresident: "",
      skMembers: []
    },
    tourismAssets: { 
      attractions: [], 
      accommodations: [], 
      profiles: [], 
      facilities: [],
      tourismMap: ""
    },
    transportation: {
      list: []
    }, 
    // Institutional / Safety Structures
    institutionalFacilities: [],
    laborForce: {},
    revenueData: {},
    emergencyContacts: [],
    tourismEducation: [],
    tourismProjects: [],
    crimeIncidents: {},
    hazardMatrix: {}
  });

  // --- THE BRIDGE ---
  // This notifies components if they are still listening to LocalStorage
  const handleSave = () => {
    localStorage.setItem('tourism_data', JSON.stringify(tourismData));
    // Trigger global event for components like AdminDashboard to re-sync
    window.dispatchEvent(new Event("storage"));
    console.log("STATE SYNCED TO LOCALSTORAGE");
  };

  // Initial Load from LocalStorage (Optional: useAdminData hook handles DB load)
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
              {/* AdminPanel now uses useAdminData() internally 
                  to handle DB logic for each tab.
              */}
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