import React, { useEffect, useState } from "react";
import bData from "./barData.json";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const role = localStorage.getItem("role");

  const handleActive = (link) => {
    setActive(link);
  };

  const routes = bData.filter((b) => {
    if (role === "admin") {
      return (
        b.title === "Dashboard" ||
        b.title === "Doctors" ||
        b.title === "Patients" ||
        b.title === "Appointments" ||
        b.title === "Departments" ||
        b.title === "Tests" ||
        b.title === "Services" ||
        b.title === "Medicines" ||
        b.title === "Requests"
      );
    } else if (role === "doctor") {
      return (
        b.title === "Appointments" ||
        b.title === "Prescriptions"
      );
    } else if (role === "patient") {
      return (
        b.title === "Prescriptions"
      );
    } else {
      return false;
    }
  });

  return (
    <div className="text-white w-[350px] h-[100vh] top-0 sticky bg-[#009BA9]">
      <div className="bg-white cursor-pointer w-[60px] h-[50px] rounded-[100px] flex items-center justify-center m-auto my-3">
        <div className="flex items-center">
          <div className="w-[15px] h-[15px] rounded-[100px] bg-black"></div>
          <div className="w-[20px] h-[5px] bg-black"></div>
          <div className="w-[15px] h-[15px] rounded-[100px] bg-black"></div>
        </div>
      </div>
      {routes.map((b) => (
        <div
          key={b.id}
          onClick={() => handleActive(b.link)}
          className={`text-[18px] rounded-l-lg ml-10 cursor-pointer hover:bg-[#EFF0F6] hover:text-[#20211A]
            ${
              active === b.link
                ? "bg-[#EFF0F6] text-[#20211A]"
                : "bg-transparent"
            }`}
        >
          <Link to={b.link} className="block p-[10px] w-full h-full">
            {b.title}
          </Link>
        </div>
      ))}
    </div>
  );
};
