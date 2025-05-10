"use client";

import { useState, useEffect } from "react";
import api from "../api/api";
import {
  FaBell,
  FaSearch
} from "react-icons/fa";
import Sidebar from "../(components)/Sidebar";
import DashboardLayout from "../(components)/Dashboard";

// State for current user and sidebar toggle
type User = {
  name: string;
};

export default function Dashboard() {
  
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [roleId, setRoleId] = useState(1);
  const [notifications, setNotifications] = useState(3);
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");

  const fetchUserData = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get("/auth/users", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setRoleId(parsedUser.role_id);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Get welcome message based on role
  const getWelcomeMessage = () => {
    if (!user) return "Welcome to Bluezo Portal";

    const name = user.name || "User";

    if (roleId === 1) return `Welcome back, Super Admin ${name}`;
    if (roleId === 2) return `Welcome back, Admin ${name}`;
    return `Welcome back, ${name}`;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleId={roleId} sidebarOpen={sidebarOpen} setSelectedMenuItem={setSelectedMenuItem} selectedMenuItem={selectedMenuItem} setSidebarOpen={setSidebarOpen}/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Left section: Toggle sidebar and page title */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 focus:outline-none focus:text-indigo-600 md:hidden cursor-pointer"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden md:block text-gray-500 focus:outline-none focus:text-indigo-600 cursor-pointer"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="ml-4 text-lg font-semibold text-gray-700">
                {selectedMenuItem.charAt(0).toUpperCase() +
                  selectedMenuItem.slice(1)}
              </h1>
            </div>

            {/* Right section: Search bar and user options */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-md text-sm border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Notification icon */}
              <div className="relative">
                <button className="flex text-gray-500 hover:text-indigo-600 focus:outline-none">
                  <FaBell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>

              {/* User menu */}
              <div className="relative">
                <button className="flex items-center text-gray-700 focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="ml-2 text-sm font-medium hidden md:block">
                    {user?.name || "User"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-100 p-4 md:p-6">
          {/* Welcome card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {getWelcomeMessage()}
            </h2>
            <p className="mt-2 text-gray-600">
              Here's what's happening with your account today.
            </p>
          </div>
          {/* Role-based content */}
          <DashboardLayout roleId={roleId}/>
        </main>
      </div>
    </div>
  );
}
