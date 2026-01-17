import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FiHome,
  FiPackage,
  FiFileText,
  FiShoppingBag,
  FiDollarSign,
  FiMap,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiBell,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaMotorcycle, FaUsers } from "react-icons/fa6";
import { CgMenuLeft } from "react-icons/cg";
import logoIcon from "../assets/logoIcon.png";
import profileIcon from "../assets/profile.png";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { role } = useRole();
  const { logOut, user } = useAuth();

  // Menu items
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
      adminOnly: true,
    },
    {
      icon: <FaUsers size={20} />,
      label: "Manage Users",
      path: "/dashboard/users-management",
      adminOnly: true,
    },
    {
      icon: <FaMotorcycle size={20} />,
      label: "Assign Riders",
      path: "/dashboard/assign-riders",
      adminOnly: true,
    },
    {
      icon: <FiDollarSign size={20} />,
      label: "Pricing Plan",
      path: "/pricing",
    },
    { icon: <FiMap size={20} />, label: "Coverage Area", path: "/coverage" },
  ];

  const filteredTopMenuItems =
    role === "Admin"
      ? topMenuItems
      : topMenuItems.filter((item) => !item.adminOnly);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged Out");
        window.location.href = "/"; /* */
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div
        className={`
          hidden md:flex flex-col
          ${sidebarOpen ? "w-60" : "w-20"}
          bg-white transition-all duration-300 py-2 overflow-hidden
        `}
      >
        {/* Logo */}
        <div className="px-5">
          {" "}
          <div className="flex items-center min-h-[64px] border-b border-gray-200  ">
            {sidebarOpen ? (
              <div className="flex items-center relative ">
                <img
                  src={logoIcon}
                  alt="ZapShift Icon"
                  className="h-10 w-[30px] relative"
                />
                <span className="font-extrabold text-2xl text-[#303030] ml-2 absolute -bottom-1 left-1">
                  ZapShift
                </span>
              </div>
            ) : (
              <img
                src={logoIcon}
                alt="ZapShift Icon"
                className="h-10 w-[30px] mx-auto"
              />
            )}
          </div>
        </div>

        {/* Menu Section */}
        <div className="flex-1  py-4 ">
          <div className="px-4 mb-6 ">
            {sidebarOpen && (
              <h2 className="text-sm font-medium text-gray-900 tracking-wide mb-2">
                MENU
              </h2>
            )}
            <div className="space-y-1">
              {filteredTopMenuItems.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[#CAEB66]
                    ${
                      isActive
                        ? "bg-[#CAEB66] text-[#0B0B0B] font-bold"
                        : "text-[#606060]"
                    }
                  `}
                  onClick={() => {}}
                >
                  <span>{item.icon}</span>
                  <span
                    className={`
    font-medium whitespace-nowrap
    transition-opacity duration-200
    ${sidebarOpen ? "opacity-100" : "opacity-0"}
  `}
                  >
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {openMobileSidebar && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpenMobileSidebar(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`
          fixed md:hidden top-0 left-0 h-full z-50
          bg-white transition-transform duration-300 ease-in-out
          ${openMobileSidebar ? "translate-x-0" : "-translate-x-full"}
          w-3/4 max-w-xs
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div className="flex items-center">
              <img
                src={logoIcon}
                alt="ZapShift Icon"
                className="h-10 w-[30px]"
              />
              <span className="font-extrabold text-2xl text-[#303030] ml-2">
                ZapShift
              </span>
            </div>
            <button
              onClick={() => setOpenMobileSidebar(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <FiX size={24} />
            </button>
          </div>

          {/*Mobile Menu - clicking the items will close the mobile sidebar */}
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-sm font-medium text-gray-900 tracking-wide mb-4">
              MENU
            </h2>
            <div className="space-y-1">
              {filteredTopMenuItems.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-3 rounded-lg transition-colors hover:bg-[#CAEB66]
                    ${
                      isActive
                        ? "bg-[#CAEB66] text-[#0B0B0B] font-bold"
                        : "text-[#606060]"
                    }
                  `}
                  onClick={() => setOpenMobileSidebar(false)}
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar Desktop + Mobile */}
        <header className="bg-white px-4 md:px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Left side - Menu Buttons (separate for desktop and mobile) */}
            <div className="flex items-center">
              {/* Desktop toggle (hidden on small screens) */}
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                className="hidden md:inline-flex p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <CgMenuLeft size={22} /> : <FiMenu size={22} />}
              </button>

              {/* Mobile toggle (visible only on small screens) */}
              <button
                onClick={() => setOpenMobileSidebar((v) => !v)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle mobile sidebar"
              >
                {openMobileSidebar ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>

            {/* Right side of navbar - Notifications and User Profile */}
            <div className="flex items-center gap-3 md:gap-4">
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
                  className="flex cursor-pointer items-center gap-2 md:gap-3 p-1 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="User profile"
                >
                  <div>
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <img src={profileIcon} alt="" className="w-10 h-10" />
                    )}
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <div className="text-left">
                      <p className="font-semibold">{user?.displayName}</p>
                      <p className="text-sm text-[#606060]">{role}</p>
                    </div>
                    <FiChevronDown
                      size={20}
                      className={`ml-1 transition-transform ${
                        profileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
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
                      <p className="font-medium text-gray-800">
                        {user?.displayName}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {role}
                      </span>
                    </div>
                    <div className="py-1">
                      <NavLink
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FiSettings size={16} />
                        <span>Profile Settings</span>
                      </NavLink>
                      <NavLink
                        to="/help"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FiHelpCircle size={16} />
                        <span>Help & Support</span>
                      </NavLink>
                    </div>
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogOut}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut size={16} />
                        <span>Logout</span>
                      </button>
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

      {/* Click outside to close dropdowns */}
      {(profileDropdownOpen || openMobileSidebar) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setProfileDropdownOpen(false);
            setOpenMobileSidebar(false);
          }}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
