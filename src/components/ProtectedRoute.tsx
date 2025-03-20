import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/authHelper";

const ProtectedRoute: React.FC = () => {
  const { token } = useAuth();
  const location = useLocation();

  // If user is not logged in, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If user is logged in and removes parts of /dashboard, ensure they stay within /dashboard
  if (location.pathname === "/dashboard") {
    return <Navigate to="/dashboard/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
