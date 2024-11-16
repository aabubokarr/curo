import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";

function IdCard(props) {
  function stringAvatar(name) {
    const displayName = name && name.length > 0 ? name.charAt(0) : "?";
    return {
      children: displayName,
      sx: {
        bgcolor: "#009BA9",
        color: "#FAFAFA",
        fontSize: "28px",
        width: 80,
        height: 80,
      },
    };
  }

  return (
    <div>
      <div className="w-[220px] h-[350px] rounded-lg bg-[#FAFAFA] flex items-center mx-auto">
        <div className="flex flex-col gap-1 w-[38px]">
          <div className="pl-1 pt-1">
            <div className="bg-white w-[30px] h-[25px] rounded-[100px] flex justify-center border-[.5px] border-[#c4c4c4] items-center">
              <div className="w-[7.5px] h-[7.5px] rounded-[100px] bg-black"></div>
              <div className="w-[10px] h-[2.5px] bg-black"></div>
              <div className="w-[7.5px] h-[7.5px] rounded-[100px] bg-black"></div>
            </div>
          </div>
          <div className="bg-[#009BA9] rounded-tr-lg text-white text-[18px] times-roman w-[38px] flex items-center justify-center rotate-180 py-6">
            Bmax Database Management System
          </div>
        </div>
        <div className="p-1 flex flex-col items-center">
          <div className="flex flex-col items-center gap-2">
            <Avatar
              {...stringAvatar(props.name)}
              className="cursor-pointer border-[#FAFAFA]"
            />
          </div>
          <h1 className="text-[18px] font-bold">{props.name}</h1>
          <h1 className="text-[12px] capitalize">{props.role}</h1>
          <h1 className="text-[16px] font-bold">{props.id}</h1>
          <h1 className="text-[12px]">{props.speciality}</h1>
          <div className="text-[10px] flex flex-col gap-1">
            <p>
              This card is the property of{" "}
              <span className="font-bold">Bmax Database Management System</span>
            </p>
            <p>
              Plot : 15, Block : B, Bashundhara, Dhaka-1229, Bangladesh, Please
              return to the above address or call : 0123456789
            </p>
          </div>
        </div>
      </div>
      <button className="mx-auto mt-2 w-[220px] h-[48px] bg-[#009BA9] flex items-center justify-center text-[16px] text-white font-bold rounded-lg">
        Download
      </button>
    </div>
  );
}

IdCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default IdCard;