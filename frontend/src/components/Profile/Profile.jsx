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
          navigate("/login");
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
    <div
      onClick={handleProfile}
      onMouseEnter={trueProfile}
      onMouseLeave={falseProfile}
    >
      <Avatar {...stringAvatar(name)} className="cursor-pointer" />
      {profileMenu && (
        <div className="absolute text-[14px] font-medium flex flex-col gap-3 right-0 bg-[#FAFAFA] p-3 rounded-lg top-[60px] border-[.5px] border-[#c4c4c4]">
          <Link
            to="/editprofile"
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src="img/settings.png" alt="settings" />
            Edit Profile
          </Link>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/");
            }}
          >
            <img src="img/logout.png" alt="logout" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};
