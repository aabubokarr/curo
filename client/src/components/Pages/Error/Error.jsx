import React from "react";
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center">
      <p className="text-[60px]">Oops!404 Not Found</p>
      <div
        className="cursor-pointer hover:bg-opacity-20 hover:bg-[#c4c4c4] rounded-[6px] p-2"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/");
        }}
      >
        Go back
      </div>
    </div>
  );
};
