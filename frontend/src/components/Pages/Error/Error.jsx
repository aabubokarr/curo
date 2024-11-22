import React from "react";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[60px]">Oops! 404 Not Found</p>
      <Link
        className="w-[120px] h-[48px] bg-[#009BA9] rounded-lg text-white flex items-center justify-center"
        to="/dashboard"
      >
        Dashboard
      </Link>
    </div>
  );
};
