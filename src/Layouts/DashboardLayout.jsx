import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  FiHome,
  FiPackage,
  FiFileText,
  FiShoppingBag,
  FiDollarSign,
  FiMap,
  FiSettings,
  FiLock,
  FiHelpCircle,
  FiLogOut,
  FiBell,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import logoIcon from "../assets/logoIcon.png";
import profileIcon from "../assets/profile.png";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Menu items for top section
  const topMenuItems = [
    { icon: <FiHome size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <FiPackage size={20} />, label: "Deliveries", path: "/deliveries" },
    {
      icon: <FiFileText size={20} />,
      label: "Invoices",
      path: "/dashboard/payment-history",
    },
    {
      icon: <FiShoppingBag size={20} />,
      label: "Rider Applications",
      path: "/dashboard/rider-applications",
    },
    {
      icon: <FaUsers size={20} />,
      label: "Users Management",
      path: "/dashboard/users-management",
    },
    {
      icon: <FiDollarSign size={20} />,
      label: "Pricing Plan",
      path: "/pricing",
    },
    { icon: <FiMap size={20} />, label: "Coverage Area", path: "/coverage" },
  ];

  // Menu items for bottom section
  const bottomMenuItems = [
    { icon: <FiSettings size={20} />, label: "Settings", path: "/settings" },
    {
      icon: <FiLock size={20} />,
      label: "Change Password",
      path: "/change-password",
    },
    { icon: <FiHelpCircle size={20} />, label: "Help", path: "/help" },
    { icon: <FiLogOut size={20} />, label: "Logout", path: "/logout" },
  ];

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div
        className={` ${
          sidebarOpen ? "w-60" : "w-20"
        } bg-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center min-h-[64px]">
          {sidebarOpen ? (
            <div className="flex border border-red-500">
              {/* Logo Icon */}
              <img
                src={logoIcon}
                alt="ZapShift Icon"
                className="h-10 w-[30px]"
              />
              <span className="font-extrabold text-2xl text-[#303030] -ml-[18px] mt-4">
                ZapShift
              </span>
            </div>
          ) : (
            <div className=" flex justify-center w-full ">
              <img
                src={logoIcon}
                alt="ZapShift Icon"
                className="h-10 w-[30px]"
              />
            </div>
          )}
        </div>
        <hr className="border-px border-gray-200 h-px" />

        {/* Top Menu Section */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-6">
            {sidebarOpen && (
              <h2 className="text-sm font-medium text-gray-900 tracking-wide mb-2">
                MENU
              </h2>
            )}
            <div className="space-y-1">
              {topMenuItems.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  end={item.path === "/dashboard"}
                  className={({
                    isActive,
                  }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[#CAEB66] ${
                    isActive
                      ? "bg-[#CAEB66] text-[#0B0B0B] font-bold"
                      : "text-[#606060]"
                  }
                  `}
                >
                  <span>{item.icon}</span>
                  {sidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Bottom Menu Section */}
          <div className="px-4 mt-6">
            {sidebarOpen && (
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                General
              </h2>
            )}
            <ul className="space-y-1">
              {bottomMenuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group ${
                      item.label === "Logout" ? "hover:text-red-600" : ""
                    }`}
                  >
                    <span className="text-gray-500 group-hover:text-gray-700">
                      {item.icon}
                    </span>
                    {sidebarOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white  px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Only Menu Button */}
            <div className="flex items-center">
              {/* Menu Toggle Button - Only Icon */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiMenu size={22} className="text-gray-600" />
              </button>
            </div>

            {/* Right side - User Profile and Notifications */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Notification Bell */}
              <button
                className="relative p-[10px] rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
                aria-label="Notifications"
              >
                <FiBell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 md:gap-3 p-1 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="User profile"
                >
                  <div className="w-10 h-10 rounded-full">
                    <img src={profileIcon} alt="" />
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <div className=" text-left">
                      <p className="font-semibold">Imran Hasan</p>
                      <p className="text-sm text-[#606060]">Admin</p>
                    </div>
                    <FiChevronDown
                      size={20}
                      className={` ml-1 transition-transform ${
                        profileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {/* Show only chevron on mobile */}
                  <FiChevronDown
                    size={16}
                    className={`md:hidden text-gray-500 transition-transform ${
                      profileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-800">Imran Hasan</p>
                      <p className="text-sm text-gray-500">
                        imran072022@gmail.com
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        Administrator
                      </span>
                    </div>
                    <div className="py-1">
                      <a
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiSettings size={16} />
                        <span>Profile Settings</span>
                      </a>
                      <a
                        href="/help"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiHelpCircle size={16} />
                        <span>Help & Support</span>
                      </a>
                    </div>
                    <div className="border-t border-gray-100 pt-1">
                      <a
                        href="/logout"
                        className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut size={16} />
                        <span>Logout</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-full 2xl:max-w-7xl mx-auto bg-white p-8 rounded-2xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Click outside to close dropdown */}
      {profileDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
