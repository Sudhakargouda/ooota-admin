import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import SetPassword from './pages/SetPassword'; 
import Home from './pages/Home';
import ManageUsers from './pages/ManageUsers';
import Restaurants from './pages/Restaurants';
import MasterData from './pages/MasterData';
import Payments from './pages/Payments';
import Profile from './pages/Profile';
import { useAuth } from "./utils/authHelper"; 
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={token ? <Navigate to="/dashboard/home" replace /> : <Login />} /> */}
        
        <Route path="/set-password" element={token ? <SetPassword /> : <Navigate to="/" />} />

        {/* Protected Routes: Only Accessible if Logged In */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<Home />} /> {/* Redirected default route */}
            <Route path="users" element={<ManageUsers />} />
            <Route path="restaurants" element={<Restaurants />} />
            <Route path="master-data" element={<MasterData />} />
            <Route path="payments" element={<Payments />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

      
      </Routes>
    </Router>
  );
}

export default App;
