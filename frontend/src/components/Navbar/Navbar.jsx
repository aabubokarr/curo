import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="xl:w-[1200px] 2xl:w-[1440px] h-[70px] flex items-center justify-between bg-[#EFF0F6] text-[18px] m-auto z-50">
      <div className="w-[160px]">
      <Link
        to="/"
        className="bg-white w-[60px] h-[50px] rounded-[100px] flex justify-center border-[.5px] border-[#c4c4c4]"
      >
        <div className="flex items-center">
          <div className="w-[15px] h-[15px] rounded-[100px] bg-black"></div>
          <div className="w-[20px] h-[5px] bg-black"></div>
          <div className="w-[15px] h-[15px] rounded-[100px] bg-black"></div>
        </div>
      </Link>
      </div>
      <ul className="flex items-center gap-[40px]">
        <li>Home</li>
        <li>Service</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      {token ? (
        <Link
          to="/dashboard"
          className="w-[160px] h-[48px] bg-[#009BA9] cursor-pointer rounded-lg flex items-center justify-center text-white"
        >
          Dashboard
        </Link>
      ) : (
        <Link
          to="/login"
          className="w-[160px] h-[48px] bg-[#009BA9] cursor-pointer rounded-lg flex items-center justify-center text-white"
        >
          Get Started
        </Link>
      )}
    </div>
  );
};
