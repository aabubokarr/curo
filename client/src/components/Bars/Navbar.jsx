import React from "react";
import { Link } from "react-scroll";
import { Link as Login } from "react-router-dom";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <div className="h-16 flex items-center justify-between gap-3 border-b-[.5px] border-b-[#c4c4c4] top-0 sticky bg-[#FAF9F6] z-10 px-10">
      <div className="bg-white cursor-pointer w-[60px] h-[50px] rounded-[100px] flex items-center justify-center my-3 border-[.5px] border-[#c4c4c4]">
        <div className="flex items-center">
          <div className="w-[15px] h-[15px] rounded-[100px] bg-black"></div>
          <div className="w-[20px] h-[5px] bg-black"></div>
          <div className="w-[15px] h-[15px] rounded-[100px] bg-black"></div>
        </div>
      </div>
      <div className="flex items-center gap-10">
      <Link
        to="hero"
        offset={-70}
        className="flex flex-col items-end gap-[2px] cursor-pointer"
      >
        Home
      </Link>
      <Link
        to="calculator"
        offset={-70}
        className="flex flex-col items-end gap-[2px] cursor-pointer"
      >
        Calculator
      </Link>
      <Link
        to="contact"
        offset={-70}
        className="flex flex-col items-end gap-[2px] cursor-pointer"
      >
        Contact
      </Link>
      <Login to="/login" className="w-24 h-[48px] cursor-pointer bg-[#298E9E] flex items-center justify-center text-white poppins font-medium rounded-lg">Login</Login>
      </div>
    </div>
  );
};
