import React from "react";
import { Link, Outlet } from "react-router-dom";
import authImage from "../assets/authImage.png";
import ProFastLogo from "../Pages/shared/ProfastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-white">
      {/* 🔒 Fixed Logo - Top Left */}
      <div className="absolute top-4 left-4 md:top-6 md:left-8 z-50">
        <div className="w-24 md:w-32">
          <Link to="/"><ProFastLogo /></Link>
        </div>
      </div>

      {/* 📝 Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 lg:px-20 py-10 bg-white order-2 md:order-1">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* 🖼️ Right Side - Image (Always Visible) */}
      <div className="flex-1 flex justify-center items-center bg-[#FAFDF0] p-6 order-1 md:order-2">
        <img
          src={authImage}
          alt="Delivery Illustration"
          className="w-full max-w-[568px] h-auto max-h-[415px] object-contain"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
