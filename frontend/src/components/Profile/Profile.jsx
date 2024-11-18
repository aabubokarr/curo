import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar } from "@mui/material";

export const Profile = () => {
  const [profileMenu, setProfileMenu] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get("http://localhost:8081/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setName(res.data.user.name);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          localStorage.removeItem("token");
          navigate("/");
        }
        console.error(err);
      });
  }, [token, navigate]);

  function stringAvatar(name) {
    return {
      children: name.charAt(0),
      sx: {
        bgcolor: "#1976d2",
        color: "#ffffff",
        fontSize: "14px",
        width: 50,
        height: 50,
      },
    };
  }

  const handleProfile = () => {
    setProfileMenu(!profileMenu);
  };

  const trueProfile = () => {
    setProfileMenu(true);
  };

  const falseProfile = () => {
    setProfileMenu(false);
  };

  return (
    <Link
      to="/edit-profile"
      onClick={handleProfile}
      onMouseEnter={trueProfile}
      onMouseLeave={falseProfile}
    >
      <Avatar {...stringAvatar(name)} className="cursor-pointer" />
      {profileMenu && (
        <div className="absolute text-[14px] font-medium right-0 bg-[#FAFAFA] p-2 rounded-lg top-[60px] border-[.5px] border-[#c4c4c4]">
          <div
            className="cursor-pointer hover:bg-opacity-20 hover:bg-[#c4c4c4] rounded-[6px] p-2"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/");
            }}
          >
            Logout
          </div>
        </div>
      )}
    </Link>
  );
};
