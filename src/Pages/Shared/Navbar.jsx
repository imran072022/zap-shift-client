import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import arrowIcon from "../../assets/arrow.png";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/services", name: "Services" },
    { to: "/coverage", name: "Coverage" },
    { to: "/about-us", name: "Average Us" },
    { to: "/pricing", name: "Pricing" },
    { to: "/be-a-rider", name: "Be a Rider" },
  ];

  return (
    <nav className="bg-white shadow-md rounded-2xl px-6 py-4 relative mt-1 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-10" />

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
        <div className="hidden md:flex gap-3.5">
          <button className="text-[#606060] border border-[#DADADA] px-6 py-2 font-bold rounded-xl cursor-pointer">
            Sign In
          </button>
          <div className="flex">
            <button className="text-[#1F1F1F] bg-[#CAEB66] px-6 py-2 font-bold rounded-xl cursor-pointer">
              Sign In
            </button>
            <img className="h-11 w-11 cursor-pointer" src={arrowIcon} alt="" />
          </div>
        </div>

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
