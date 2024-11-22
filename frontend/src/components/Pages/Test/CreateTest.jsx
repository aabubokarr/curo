import React, { useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateTest = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    patient_id: "",
    test_name: "",
    test_cost: "",
  });

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

    if (window.confirm("Are you sure you want to create this test?")) {
      axios
        .post("http://localhost:8081/create/test", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Test created successfully", res.data);
          alert("Test created successfully!");
          navigate("/test");
        })
        .catch((error) => {
          console.error("Error creating test:", error);
          if (error.response && error.response.data) {
            alert(
              `Failed to create test: ${
                error.response.data.error || "Unknown error"
              }`
            );
          } else {
            alert("Failed to create test due to network error.");
          }
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Create Test</h1>
          <Profile />
        </div>
        <div className="bg-[#FAFAFA] rounded-[20px] p-5">
          {error && (
            <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="patient_id">Patient ID</label>
                <input
                  onChange={handleChange}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="number"
                  placeholder="Enter Patient ID"
                  name="patient_id"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="test_name">Test Name</label>
                <input
                  onChange={handleChange}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="text"
                  placeholder="Enter Test Name"
                  name="test_name"
                />
              </div>
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="test_cost">Test Cost</label>
                <input
                  onChange={handleChange}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="number"
                  placeholder="Enter Test Cost"
                  name="test_cost"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 w-full h-[48px] bg-[#009BA9] flex items-center justify-center text-[16px] text-white font-bold rounded-lg"
            >
              CREATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
