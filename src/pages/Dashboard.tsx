import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiUser } from "react-icons/fi";
import { MdDashboard, MdPeople, MdRestaurant, MdPayment, MdStorage } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // Logout pop-up state

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } bg-gray-900 text-white h-full p-4 fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Sidebar Header - Menu Icon at Top */}
        <div className="flex items-center justify-between mb-5">
          {!isSidebarCollapsed && <h2 className="text-2xl font-bold">🏗️ LOGO</h2>}
          <button className={`text-white transition-all duration-300 ${isSidebarCollapsed ? "ml-3" : ""}`}  onClick={toggleSidebar}>
            <IoMenu size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="space-y-3 flex-grow">
          {[
            { to: "/dashboard", icon: MdDashboard, text: "Home" },
            { to: "/dashboard/users", icon: MdPeople, text: "Manage Users" },
            { to: "/dashboard/restaurants", icon: MdRestaurant, text: "Restaurants" },
            { to: "/dashboard/master-data", icon: MdStorage, text: "Master Data" },
            { to: "/dashboard/payments", icon: MdPayment, text: "Payments" },
          ].map(({ to, icon: Icon, text }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-300"
            >
              <Icon size={24} className="text-white" />
              <span
                className={`ml-2 text-white transition-all duration-300 ${
                  isSidebarCollapsed ? "hidden opacity-0" : "opacity-100"
                }`}
              >
                {text}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <header className="bg-blue-600 text-white flex items-center px-4 py-6 shadow-lg">
          <div className="flex-grow text-center">
            <h2 className="text-xl font-semibold">Welcome, User</h2>
          </div>
          <div className="relative">
            <FaUserCircle
              size={32}
              className="cursor-pointer text-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-lg rounded-lg">
                <Link to="/dashboard/profile" className="flex items-center px-4 py-2 hover:bg-gray-200">
                  <FiUser className="mr-2 text-gray-700" /> Profile
                </Link>

                {/* Logout Button with Confirmation Pop-up */}
                <button
                  onClick={() => setLogoutDialogOpen(true)}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-200 w-full"
                >
                  <FiLogOut className="mr-2 text-red-600" /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-grow overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        sx={{ "& .MuiPaper-root": { borderRadius: 3, p: 2 } }} // Centered & Styled
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => setLogoutDialogOpen(false)} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} variant="contained" color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
