import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "../Bars/Sidebar";
import { Profile } from "./Profile";
import Button from "../Button/Button";

export const EditProfile = () => {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    old_pass: "",
    new_pass: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8081/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch profile data.");
      });
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormComplete = Object.values(formData).every(
      (field) => field !== ""
    );
    if (!isFormComplete) {
      setError("Please fill in all required fields.");
      return;
    }

    if (window.confirm("Are you sure you want to update you password?")) {
      axios
        .post("http://localhost:8081/user/password", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Password updated successfully", res.data);
          alert("Password updated successfully");
          setError("")
        })
        .catch((error) => {
          console.error("Error updating password:", error);
          if (error.response && error.response.data) {
            setError(
              `Failed to update password: ${
                error.response.data.error || "Unknown error"
              }`
            );
          } else {
            alert("Failed to update password due to network error.");
          }
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Edit Profile</h1>
          <Profile />
        </div>
        <div className="bg-[#FAFAFA] rounded-[20px] p-5 w-full">
          {error && (
            <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
              {error}
            </div>
          )}
          <div>
            <h1 className="text-[20px] font-semibold">User Details</h1>
            <h2>ID : {profile.user_id}</h2>
            <h2>Name : {profile.name}</h2>
            <h2>Email : {profile.email}</h2>
          </div>
          <h1 className="text-[20px] font-semibold mt-3">Change Password</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col items-center gap-1 text-[#009BA9] text-[16px] w-full">
              <label htmlFor="old_pass">Enter Old Password</label>
              <input
                onChange={handleChange}
                className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                type="password"
                placeholder="Enter Your Old Password"
                name="old_pass"
              />
            </div>
            <div className="flex flex-col items-center gap-1 text-[#009BA9] text-[16px] w-full">
              <label htmlFor="new_pass">Enter New Password</label>
              <input
                onChange={handleChange}
                className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                type="password"
                placeholder="Enter Your New Password"
                name="new_pass"
              />
            </div>
            <Button name="UPDATE" />
          </form>
        </div>
      </div>
    </div>
  );
};
