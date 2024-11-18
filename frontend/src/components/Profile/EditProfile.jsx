import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EditProfile = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      axios
        .get("http://localhost:8081/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfileData(res.data.user);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch profile data.");
        });
    }
  }, [token, navigate]);

  return (
    <div>
      {error && (
        <div className="bg-red-200 text-red-600 p-2 rounded mb-4">{error}</div>
      )}
      <div>
        <p>Name: {profileData.name}</p>
        <p>Email: {profileData.email}</p>
      </div>
    </div>
  );
};
