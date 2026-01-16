import React from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import forbidden403 from "../assets/LottiFiles/forbidden403.json";

const Forbidden403 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      {/* Lottie Animation */}
      <div className="w-64 md:w-96">
        <Lottie animationData={forbidden403} loop={true} />
      </div>

      {/* Main Text */}
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mt-4">
        403 Forbidden
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mt-2">
        You do not have permission to access this page.
      </p>
      <p className="text-gray-500 mt-1">
        Please check your access rights or return to a safe page.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-6 flex-wrap justify-center">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg border border-gray-300 bg-[#CAEB66] text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 rounded-lg  bg-[#03373D] text-white font-semibold hover:brightness-95 transition cursor-pointer"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Forbidden403;
