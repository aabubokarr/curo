import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import Button from "../../Button/Button";

export const EditTest = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const { testId } = useParams();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [test, setTest] = useState({});
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    treatment_id: "",
    test_name: "",
    test_cost: "",
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/test/${testId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTest(res.data), console.log(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch test data");
        console.error(err);
      });
  }, [testId, token, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormComplete = Object.values(formData).some(
      (field) => field !== ""
    );
    if (!isFormComplete) {
      setError("Please fill in at least one required field.");
      return;
    }

    if (window.confirm("Are you sure you want to update info?")) {
      console.log(formData);

      axios
        .patch(`${API_URL}/test/update/${testId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Test updated successfully", res.data);
          alert("Test updated successfully");
        })
        .catch((error) => {
          console.error("Error updating test:", error);
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Edit Test</h1>
          <Profile />
        </div>
        {role === "admin" ? (
          <div className="bg-[#FAFAFA] rounded-[20px] p-5 w-full">
            {error && (
              <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                  <label htmlFor="treatment_id">Treatment ID</label>
                  <input
                    onChange={handleChange}
                    className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                    type="number"
                    placeholder={test.treatment_id}
                    name="treatment_id"
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
                    placeholder={test.test_name}
                    name="test_name"
                  />
                </div>
                <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                  <label htmlFor="test_cost">Test Cost</label>
                  <input
                    onChange={handleChange}
                    className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                    type="number"
                    placeholder={test.test_cost}
                    name="test_cost"
                  />
                </div>
              </div>
              <Button name="UPDATE" />
            </form>
          </div>
        ) : (
          <div className="text-center">You don't have access to this page</div>
        )}
      </div>
    </div>
  );
};
