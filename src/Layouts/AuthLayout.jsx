import React from "react";
import logo from "../assets/logo.png";
import authImage from "../assets/authImage.png";
import { Link, Outlet } from "react-router";
const AuthLayout = () => {
  return (
    <div className="bg-white flex ">
      <div className="w-[54%] min-h-screen px-10 flex flex-col">
        <Link to="/">
          <img src={logo} alt="" className="scale-[0.70] w-[153px] mt-7" />
        </Link>
        <div className=" flex justify-center items-center flex-1">
          <Outlet />
        </div>
      </div>
      <div className="bg-[#FAFDF0] flex items-center justify-center flex-1 min-h-screen ">
        <img src={authImage} alt="" className="scale-[0.9]" />
      </div>
    </div>
  );
};

export default AuthLayout;
