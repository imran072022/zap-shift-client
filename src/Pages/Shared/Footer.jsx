import React from "react";
import logo from "../../assets/logo-footer.png";
import linkedin from "../../assets/linkedin.png";
import x from "../../assets/x.png";
import fb from "../../assets/facebook.png";
import yt from "../../assets/youtube.png";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] rounded-4xl px-24 py-20">
      <div className="mb-8 max-w-[720px] mx-auto  ">
        <img src={logo} alt="" className="mb-3.5 mx-auto" />
        <p className="text-[#DADADA] text-center">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div class="h-px w-full bg-[repeating-linear-gradient(to_right,#03464D_0_4px,transparent_4px_8px)]"></div>
      <div className="flex items-center justify-center gap-8 py-4">
        <Link className="font-medium text-[#DADADA]">Services</Link>
        <Link className="font-medium text-[#DADADA]">Coverage</Link>
        <Link className="font-medium text-[#DADADA]">About Us</Link>
        <Link className="font-medium text-[#DADADA]">Pricing</Link>
        <Link className="font-medium text-[#DADADA]">Blog</Link>
        <Link className="font-medium text-[#DADADA]">Contact</Link>
      </div>
      <div class="h-px w-full bg-[repeating-linear-gradient(to_right,#03464D_0_4px,transparent_4px_8px)]"></div>
      <div className="flex justify-center items-center gap-6 mt-8">
        <img src={linkedin} alt="" />
        <img src={x} alt="" />
        <img src={fb} alt="" />
        <img src={yt} alt="" />
      </div>
    </footer>
  );
};

export default Footer;
