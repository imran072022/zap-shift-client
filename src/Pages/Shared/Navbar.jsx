import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import arrowIcon from "../../assets/arrow.png";
import useAuth from "../../Hooks/useAuth";
import profile from "../../assets/profile.png";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { logOut, user, loading } = useAuth();
  const navItems = [
    { to: "/dashboard", name: "Dashboard" },
    { to: "/coverage", name: "Coverage" },
    { to: "/tracking-parcel/:trackingId", name: "Track Order" },
    { to: "/pricing", name: "Pricing" },
    { to: "/be-rider", name: "Be a Rider" },
    { to: "/send-parcel", name: "Send Parcel" },
  ];

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="bg-white shadow-md rounded-2xl px-6 py-4 relative mt-1 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="text-[#606060] hover:text-black font-medium"
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop button */}
        {loading ? (
          <div className="w-[164.5px]"></div>
        ) : user ? (
          <div className="hidden md:flex gap-3.5 items-center ">
            <div className=" h-10 w-10 rounded-full">
              {user.photoURL ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              ) : (
                <img src={profile} alt="" />
              )}
            </div>
            <div>
              <Link
                onClick={handleLogOut}
                className="text-[#1F1F1F] bg-[#CAEB66] px-6 py-2 font-bold rounded-xl cursor-pointer flex items-center justify-center"
              >
                Sign Out
              </Link>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex gap-3.5">
            <Link
              to="/login"
              className="text-[#606060] flex items-center justify-center border border-[#DADADA] px-6 py-2 font-bold rounded-xl cursor-pointer"
            >
              Sign In
            </Link>
            <div className="flex">
              <Link
                to="/register"
                className="text-[#1F1F1F] bg-[#CAEB66] px-6 py-2 font-bold rounded-xl cursor-pointer flex items-center justify-center"
              >
                Sign Up
              </Link>
              <img
                className="h-11 w-11 cursor-pointer"
                src={arrowIcon}
                alt=""
              />
            </div>
          </div>
        )}

        {/* Mobile menu toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute left-0 right-0 top-full mt-3 bg-white shadow-lg rounded-xl border">
          <div className="flex flex-col divide-y">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                {item.name}
              </NavLink>
            ))}
            <button className="m-4 bg-black text-white py-2 rounded-lg">
              Button
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
