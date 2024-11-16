import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EditProfile = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch profile data.");
          setLoading(false);
        });
    }
  }, [token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <p>Name: {profileData.name}</p>
      <p>Email: {profileData.email}</p>
    </div>
  );
};