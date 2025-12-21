import React from "react";
import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
      <header>
        <nav>
          <Navbar></Navbar>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
