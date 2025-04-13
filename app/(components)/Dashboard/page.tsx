"use client";

import { useState, useEffect } from "react";
import api from "../../api/api";
import {
  FaUserShield,
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaUserCircle,
  FaBuilding,
  FaDatabase,
  FaUsersCog,
  FaFileAlt,
  FaClipboardCheck,
  FaToolbox,
} from "react-icons/fa";

export default function Dashboard() {
  // State for current user and sidebar toggle
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [roleId, setRoleId] = useState(null);
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
          console.log(response);

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
  // Navigation items based on role
  const getNavigationItems = () => {
    // Common menu items for all roles
    const common = [
      {
        id: "dashboard",
        name: "Dashboard",
        icon: <FaTachometerAlt className="w-5 h-5" />,
      },
      {
        id: "profile",
        name: "My Profile",
        icon: <FaUserCircle className="w-5 h-5" />,
      },
    ];

    // Role-specific menu items
    if (roleId === 1) {
      // Super Admin
      return [
        ...common,
        {
          id: "users",
          name: "User Management",
          icon: <FaUsers className="w-5 h-5" />,
        },
        {
          id: "admins",
          name: "Admin Management",
          icon: <FaUserShield className="w-5 h-5" />,
        },
        {
          id: "organizations",
          name: "Organizations",
          icon: <FaBuilding className="w-5 h-5" />,
        },
        {
          id: "system",
          name: "System Settings",
          icon: <FaCog className="w-5 h-5" />,
        },
        {
          id: "database",
          name: "Database Manager",
          icon: <FaDatabase className="w-5 h-5" />,
        },
        {
          id: "reports",
          name: "Global Reports",
          icon: <FaChartBar className="w-5 h-5" />,
        },
      ];
    } else if (roleId === 2) {
      // Admin
      return [
        ...common,
        {
          id: "users",
          name: "User Management",
          icon: <FaUsers className="w-5 h-5" />,
        },
        {
          id: "roles",
          name: "Role Management",
          icon: <FaUsersCog className="w-5 h-5" />,
        },
        {
          id: "tasks",
          name: "Task Management",
          icon: <FaClipboardList className="w-5 h-5" />,
        },
        {
          id: "settings",
          name: "Settings",
          icon: <FaCog className="w-5 h-5" />,
        },
        {
          id: "reports",
          name: "Reports",
          icon: <FaChartBar className="w-5 h-5" />,
        },
      ];
    } else {
      // Regular User
      return [
        ...common,
        {
          id: "tasks",
          name: "My Tasks",
          icon: <FaClipboardCheck className="w-5 h-5" />,
        },
        {
          id: "documents",
          name: "Documents",
          icon: <FaFileAlt className="w-5 h-5" />,
        },
        { id: "tools", name: "Tools", icon: <FaToolbox className="w-5 h-5" /> },
      ];
    }
  };

  // Get welcome message based on role
  const getWelcomeMessage = () => {
    if (!user) return "Welcome to Bluezo Portal";

    const name = user.name || "User";

    if (roleId === 1) return `Welcome back, Super Admin ${name}`;
    if (roleId === 2) return `Welcome back, Admin ${name}`;
    return `Welcome back, ${name}`;
  };

  // Handle logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/Login";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-indigo-600 text-white transition-all duration-300 ease-in-out hidden md:block`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-center h-16 border-b border-indigo-500 mb-5">
            <div
              className={`flex items-center ${
                sidebarOpen ? "justify-start pl-4" : "justify-center"
              }`}
            >
              <FaUserShield className="h-8 w-8" />
              {sidebarOpen && (
                <span className="ml-2 text-2xl font-bold">Bluezo</span>
              )}
            </div>
          </div>

          {/* Sidebar Links */}
          <nav className="flex-1 px-2">
            <ul className="space-y-1">
              {getNavigationItems().map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setSelectedMenuItem(item.id)}
                    className={`flex items-center ${
                      sidebarOpen ? "justify-start px-4" : "justify-center"
                    } py-3 rounded-md w-full hover:bg-indigo-700 ${
                      selectedMenuItem === item.id ? "bg-indigo-800" : ""
                    }`}
                  >
                    <span className="text-indigo-200">{item.icon}</span>
                    {sidebarOpen && (
                      <span className="ml-3 text-sm font-medium">
                        {item.name}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-indigo-500">
            <button
              onClick={handleLogout}
              className={`flex items-center ${
                sidebarOpen ? "justify-start px-4" : "justify-center"
              } py-2 rounded-md w-full hover:bg-indigo-700 text-indigo-200`}
            >
              <FaSignOutAlt className="h-5 w-5" />
              {sidebarOpen && (
                <span className="ml-3 text-sm font-medium">Logout</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-30 w-64 bg-indigo-600 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 border-b border-indigo-500 px-4">
            <div className="flex items-center">
              <FaUserShield className="h-8 w-8" />
              <span className="ml-2 text-2xl font-bold">Bluezo</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-2 py-4">
            <ul className="space-y-1">
              {getNavigationItems().map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setSelectedMenuItem(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`flex items-center px-4 py-3 rounded-md w-full hover:bg-indigo-700 ${
                      selectedMenuItem === item.id ? "bg-indigo-800" : ""
                    }`}
                  >
                    <span className="text-indigo-200">{item.icon}</span>
                    <span className="ml-3 text-sm font-medium">
                      {item.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-indigo-500">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-md w-full hover:bg-indigo-700 text-indigo-200"
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Left section: Toggle sidebar and page title */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 focus:outline-none focus:text-indigo-600 md:hidden"
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
                className="hidden md:block text-gray-500 focus:outline-none focus:text-indigo-600"
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
          {roleId === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    Total Users
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Super Admin
                  </span>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-700">1,458</p>
                <div className="flex items-center mt-4 text-sm text-green-500">
                  <span>+5.25%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    Organizations
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Super Admin
                  </span>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-700">24</p>
                <div className="flex items-center mt-4 text-sm text-green-500">
                  <span>+2 new</span>
                  <span className="ml-1">this week</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    System Status
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Super Admin
                  </span>
                </div>
                <p className="mt-2 text-3xl font-bold text-green-500">
                  Healthy
                </p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <span>Last checked: 5 minutes ago</span>
                </div>
              </div>
            </div>
          )}

          {roleId === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    Active Users
                  </h3>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Admin
                  </span>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-700">243</p>
                <div className="flex items-center mt-4 text-sm text-green-500">
                  <span>+12</span>
                  <span className="ml-1">new this week</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    Pending Tasks
                  </h3>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Admin
                  </span>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-700">18</p>
                <div className="flex items-center mt-4 text-sm text-orange-500">
                  <span>5 require attention</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    Department Status
                  </h3>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Admin
                  </span>
                </div>
                <p className="mt-2 text-3xl font-bold text-green-500">
                  On Track
                </p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <span>3 projects due this week</span>
                </div>
              </div>
            </div>
          )}

          {roleId === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    My Tasks
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    User
                  </span>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-700">7</p>
                <div className="flex items-center mt-4 text-sm text-red-500">
                  <span>2 overdue</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    Upcoming Deadlines
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    User
                  </span>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-700">3</p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <span>Next: Project report (Tomorrow)</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    Recent Documents
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    User
                  </span>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-700">12</p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <span>4 new documents added</span>
                </div>
              </div>
            </div>
          )}

          {/* Fallback content if no role detected */}
          {!roleId && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <FaUserCircle className="mx-auto h-16 w-16 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  Loading user data...
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Please wait while we retrieve your information.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
