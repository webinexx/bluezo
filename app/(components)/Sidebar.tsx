import React from "react";
import {
  FaBuilding,
  FaChartBar,
  FaClipboardCheck,
  FaClipboardList,
  FaCog,
  FaDatabase,
  FaFileAlt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaToolbox,
  FaUserCircle,
  FaUsers,
  FaUsersCog,
  FaUserShield,
} from "react-icons/fa";

function Sidebar({
  roleId,
  sidebarOpen,
  setSelectedMenuItem,
  selectedMenuItem,
  setSidebarOpen,
}: any) {
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

  // Handle logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/Login";
    }
  };

  return (
    <div>
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-indigo-600 text-white transition-all duration-300 ease-in-out hidden md:block h-full`}
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
                    className={`flex items-center cursor-pointer ${
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
              className={`flex items-center cursor-pointer ${
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
          className="md:hidden fixed inset-0 z-20"
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
              className="text-white cursor-pointer"
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
                    className={`flex items-center px-4 py-3 rounded-md w-full hover:bg-indigo-700 cursor-pointer ${
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
              className="flex items-center px-4 py-2 rounded-md w-full hover:bg-indigo-700 text-indigo-200 cursor-pointer"
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
