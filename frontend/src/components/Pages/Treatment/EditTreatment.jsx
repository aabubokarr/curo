import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";

export const EditTreatment = () => {
  const { planId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [treatment, setTreatment] = useState({});
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    patient_id: "",
    diagnosis: "",
    medications: "",
    plan_details: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/treatment-plan/${planId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTreatment(res.data), console.log(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch treatment data");
        console.error(err);
      });
  }, [planId, token, navigate]);

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
        .patch(
          `http://localhost:8081/update/treatment-plan/${planId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log("Treatment updated successfully", res.data);
          alert("Treatment updated successfully");
        })
        .catch((error) => {
          console.error("Error updating treatment:", error);
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Edit Treatment Plan</h1>
          <Profile />
        </div>
        <div className="bg-[#FAFAFA] rounded-[20px] p-5 w-full">
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
                  placeholder={treatment.patient_id}
                  name="patient_id"
                />
              </div>
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="diagnosis">Diagnosis</label>
                <input
                  onChange={handleChange}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="text"
                  placeholder={treatment.diagnosis}
                  name="diagnosis"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="medications">Medications</label>
                <input
                  onChange={handleChange}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="text"
                  placeholder={treatment.medications}
                  name="medications"
                />
              </div>
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="plan_details">Plan Details</label>
                <input
                  onChange={handleChange}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="text"
                  placeholder={treatment.plan_details}
                  name="plan_details"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 w-full h-[48px] bg-[#009BA9] flex items-center justify-center text-[16px] text-white font-bold rounded-lg"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
